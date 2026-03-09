// tools.js - tools.html ページ専用スクリプト

// タブ切り替え機能
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.tool-tab');
  const toolSections = document.querySelectorAll('.tool-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();

      // 全てのタブからアクティブクラスを削除
      tabs.forEach(t => t.classList.remove('active'));

      // クリックされたタブにアクティブクラスを追加
      this.classList.add('active');

      // 対応するセクションを表示
      const tabId = this.getAttribute('data-tab');
      toolSections.forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(`${tabId}-tools`).classList.add('active');
    });
  });
});