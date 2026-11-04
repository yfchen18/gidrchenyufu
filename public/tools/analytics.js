/*
 * GA4 載入器。
 *
 * 原本這段是寫在 Base.astro 的內嵌 <script>，但那樣嚴格 CSP 就得對它做雜湊比對，
 * 而雜湊內含評估 ID——ID 一改雜湊就對不上，GA4 會「靜默停止收資料」，很難發現。
 * 改成外部檔之後 script-src 'self' 就涵蓋，改 ID 不會弄壞任何東西。
 *
 * 評估 ID 由 Base.astro 以 data-ga4 屬性傳進來，仍然只在正式建置時輸出。
 */
(function () {
  var el = document.querySelector("script[data-ga4]");
  var id = el && el.getAttribute("data-ga4");
  if (!id) return;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", id);
})();
