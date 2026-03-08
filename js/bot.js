// bot.js - bot.html ページ専用スクリプト

document.addEventListener('DOMContentLoaded', () => {
  // モバイル向け：外部アプリ / サーバーコマンドをタブで切り替え
  document.querySelectorAll('.command-tabs .tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.command-tabs .tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-target');
      document.querySelectorAll('.command-section').forEach(section => {
        section.classList.toggle('active', section.classList.contains(target));
      });
    });
  });
});
