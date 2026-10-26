/*
 * FIB-4 肝纖維化風險指數計算機
 *
 * 全部在瀏覽器內計算，不送出、不儲存任何資料，也沒有任何外部相依。
 * 用法：在 markdown 裡放 <fib4-calculator></fib4-calculator>，
 * 並在該檔 frontmatter 加上 tool: fib4（模板才會載入這支檔案）。
 *
 * 公式與切點依 AASLD NAFLD Practice Guidance (Hepatology 2023;77:1797-1835)：
 *   FIB-4 =（年齡 × AST）÷（血小板 × √ALT）
 *   低風險 < 1.3（65 歲以上改用 2.0）／高風險 > 2.67
 * 35 歲以下未經驗證，另外提示。
 */
(function () {
  if (window.customElements && customElements.get("fib4-calculator")) return;

  var FIELDS = [
    { key: "age", label: "年齡", unit: "歲", min: 18, max: 120, step: "1", hint: "" },
    { key: "ast", label: "AST（GOT）", unit: "U/L", min: 1, max: 3000, step: "0.1", hint: "" },
    { key: "alt", label: "ALT（GPT）", unit: "U/L", min: 1, max: 3000, step: "0.1", hint: "" },
    {
      key: "plt", label: "血小板", unit: "10³/µL", min: 1, max: 2000, step: "1",
      hint: "報告上可能寫 K/µL 或 ×10⁹/L，數字相同",
    },
  ];

  var BANDS = {
    low: {
      light: "綠燈", name: "低風險",
      text: "進階肝纖維化的機會很低。維持體重、腰圍與血糖血脂的控制，一般建議每一到兩年用同樣四個數字重新評估一次。",
    },
    mid: {
      light: "黃燈", name: "中度風險（不確定）",
      text: "這個區間無法只靠抽血判斷。建議安排肝纖維化掃描（超音波彈性成像，常稱 FibroScan）進一步評估。",
    },
    high: {
      light: "紅燈", name: "高風險",
      text: "建議盡快就診評估，通常需要進一步檢查，必要時轉介肝膽專科。這不代表已經確診，但不適合再觀察。",
    },
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function Fib4() {
    return Reflect.construct(HTMLElement, [], Fib4);
  }
  Fib4.prototype = Object.create(HTMLElement.prototype);
  Fib4.prototype.constructor = Fib4;
  Object.setPrototypeOf(Fib4, HTMLElement);

  Fib4.prototype.connectedCallback = function () {
    if (this.dataset.ready) return;
    this.dataset.ready = "1";

    var id = "fib4-" + Math.random().toString(36).slice(2, 8);
    var rows = FIELDS.map(function (f) {
      return (
        '<div class="fib4-field">' +
        '<label for="' + id + "-" + f.key + '">' + esc(f.label) +
        ' <span class="fib4-unit">' + esc(f.unit) + "</span></label>" +
        '<input id="' + id + "-" + f.key + '" data-k="' + f.key + '" type="number" inputmode="decimal" ' +
        'min="' + f.min + '" max="' + f.max + '" step="' + f.step + '" autocomplete="off" />' +
        (f.hint ? '<small class="fib4-hint">' + esc(f.hint) + "</small>" : "") +
        "</div>"
      );
    }).join("");

    this.innerHTML =
      '<div class="fib4">' +
      '<p class="fib4-title">FIB-4 肝纖維化風險指數計算機</p>' +
      '<p class="fib4-intro">拿你的抽血報告，把四個數字填進去。計算在你的瀏覽器內完成，' +
      "<strong>不會傳送、不會儲存任何資料</strong>。</p>" +
      '<div class="fib4-grid">' + rows + "</div>" +
      '<div class="fib4-out" role="status" aria-live="polite">' +
      '<p class="fib4-empty">四個數字都填好後會自動顯示結果。</p></div>' +
      '<p class="fib4-foot">FIB-4 是<strong>風險分層的篩選工具，不是診斷</strong>。' +
      "急性生病期間的數值不準；血小板因其他原因偏低、或 AST 因劇烈運動與肌肉問題上升，都會讓分數失真。" +
      "請把結果帶到門診，由醫師結合你的完整狀況判斷。</p>" +
      "</div>";

    var self = this;
    var inputs = this.querySelectorAll("input[data-k]");
    Array.prototype.forEach.call(inputs, function (el) {
      el.addEventListener("input", function () { self._update(); });
    });
  };

  Fib4.prototype._update = function () {
    var vals = {};
    var missing = false;
    var bad = [];

    Array.prototype.forEach.call(this.querySelectorAll("input[data-k]"), function (el) {
      var f = FIELDS.filter(function (x) { return x.key === el.dataset.k; })[0];
      var raw = el.value.trim();
      if (raw === "") { missing = true; return; }
      var n = Number(raw);
      if (!isFinite(n) || n < f.min || n > f.max) { bad.push(f.label); return; }
      vals[f.key] = n;
    });

    var out = this.querySelector(".fib4-out");

    if (bad.length) {
      out.className = "fib4-out fib4-bad";
      out.innerHTML = '<p class="fib4-empty">請檢查這幾欄的數值是否正確：' + esc(bad.join("、")) + "。</p>";
      return;
    }
    if (missing || Object.keys(vals).length < FIELDS.length) {
      out.className = "fib4-out";
      out.innerHTML = '<p class="fib4-empty">四個數字都填好後會自動顯示結果。</p>';
      return;
    }

    var score = (vals.age * vals.ast) / (vals.plt * Math.sqrt(vals.alt));
    var lower = vals.age >= 65 ? 2.0 : 1.3;
    var band = score < lower ? "low" : score > 2.67 ? "high" : "mid";
    var b = BANDS[band];

    var notes = [];
    if (vals.age >= 65) {
      notes.push("你已滿 65 歲，低風險的切點自動改用 <strong>2.0</strong>（而非 1.3），以免因年齡本身被判為偏高。");
    }
    if (vals.age < 35) {
      notes.push("<strong>35 歲以下未經充分驗證</strong>，在合併糖尿病或肥胖的年輕人身上可能低估風險。這個分數不適合單獨用來排除問題，請與醫師討論。");
    }

    out.className = "fib4-out fib4-" + band;
    out.innerHTML =
      '<div class="fib4-score"><span class="fib4-num">' + score.toFixed(2) + "</span>" +
      '<span class="fib4-band"><span class="fib4-dot" aria-hidden="true"></span>' +
      esc(b.light) + " · " + esc(b.name) + "</span></div>" +
      "<p>" + b.text + "</p>" +
      '<p class="fib4-cut">你這個年齡適用的分界：低風險 &lt; ' + lower + "　|　高風險 &gt; 2.67</p>" +
      (notes.length ? '<p class="fib4-note">' + notes.join("</p><p class=\"fib4-note\">") + "</p>" : "");
  };

  customElements.define("fib4-calculator", Fib4);
})();
