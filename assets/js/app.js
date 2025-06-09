// DOMContentLoaded: モバイルナビ開閉のみ
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const nav       = document.getElementById('nav');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
});
