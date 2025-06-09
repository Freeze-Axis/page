// assets/js/app.js
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const headerNav = document.getElementById('nav');
  const footerNav = document.getElementById('footer-nav');

  // ヘッダー：モバイル時ハンバーガーメニュー開閉
  if (navToggle && headerNav) {
    navToggle.addEventListener('click', () => {
      headerNav.classList.toggle('active');
    });
  }

  // nav.html を fetch し、一時的に DOM に流し込んで #header-menu / #footer-menu を抽出、挿入
  if (headerNav || footerNav) {
    fetch('nav.html')
      .then(res => {
        if (!res.ok) throw new Error('nav.html の読み込みに失敗: ' + res.status);
        return res.text();
      })
      .then(htmlText => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlText;

        // ヘッダー用メニュー挿入
        const headerMenu = tempDiv.querySelector('#header-menu');
        if (headerNav) {
          if (headerMenu) {
            headerNav.innerHTML = headerMenu.outerHTML;
          } else {
            console.warn('nav.html に #header-menu が見つかりません');
          }
        }
        // フッター用メニュー挿入
        const footerMenu = tempDiv.querySelector('#footer-menu');
        if (footerNav) {
          if (footerMenu) {
            footerNav.innerHTML = footerMenu.outerHTML;
          } else {
            console.warn('nav.html に #footer-menu が見つかりません');
          }
        }
      })
      .catch(err => {
        console.error('nav.html 読み込みエラー:', err);
        // 必要であればフォールバックリンクを設定する等の処理をここに
      });
  }
});
