// license.js - LICENSE.html ページ専用スクリプト

// 著作権年を自動更新
(function() {
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    const currentYear = new Date().getFullYear();
    copyrightYear.textContent = currentYear;
  }
})();