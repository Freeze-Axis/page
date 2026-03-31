// bot.js - bot.html ページ専用スクリプト

document.addEventListener('DOMContentLoaded', () => {
  // フロントエンド静的ホスト運用のため、モード別 og メタ埋め込みは廃止
  const cfg = {
    pageTitle: '荒らしBot導入ガイド',
    description: '外部アプリ版とNuke版のコマンド説明をまとめて表示しています。'
  };

  // body にモードクラスを付与（CSSでモード別スタイル設定できるように）
  if (!document.body.classList.contains('bot-external') && !document.body.classList.contains('bot-nuke')) {
    document.body.classList.add('bot-page');
  }
  document.body.classList.remove('external', 'nuke');

  // mode-list のアクティブ表示制御
  document.querySelectorAll('.mode-card').forEach(card => {
    card.classList.remove('active');
  });

  // bot.html（モード選択ページ）のみタイトルを動的に設定
  if (document.body.classList.contains('bot-page')) {
    document.title = `Freeze公式サイト - ${cfg.pageTitle}`;
    document.querySelector('.page-title').textContent = cfg.pageTitle;
  }

  const modeList = document.getElementById('mode-list');
  const backNav = document.getElementById('back-nav');
  const externalSection = document.querySelector('.external-commands');
  const nukeSection = document.querySelector('.nuke-commands');
  const tabs = document.querySelector('.command-tabs');

  if (document.body.classList.contains('bot-external')) {
    if (modeList) modeList.style.display = 'none';
    if (backNav) backNav.style.display = 'block';
    if (tabs) tabs.style.display = 'none';
    if (externalSection) externalSection.classList.add('active');
    if (nukeSection) nukeSection.classList.remove('active');
  } else if (document.body.classList.contains('bot-nuke')) {
    if (modeList) modeList.style.display = 'none';
    if (backNav) backNav.style.display = 'block';
    if (tabs) tabs.style.display = 'none';
    if (externalSection) externalSection.classList.remove('active');
    if (nukeSection) nukeSection.classList.add('active');
  } else {
    if (modeList) modeList.style.display = 'flex';
    if (backNav) backNav.style.display = 'none';
    if (tabs) tabs.style.display = 'none';
    if (externalSection) externalSection.classList.remove('active');
    if (nukeSection) nukeSection.classList.remove('active');
  }

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

  // コマンド詳細のトグル
  document.querySelectorAll('.detail-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const detail = toggle.parentElement.querySelector('.command-detail');
      const icon = toggle.querySelector('i');
      if (detail.style.display === 'none' || detail.style.display === '') {
        detail.style.display = 'block';
        icon.classList.remove('fa-plus');
        icon.classList.add('fa-minus');
      } else {
        detail.style.display = 'none';
        icon.classList.remove('fa-minus');
        icon.classList.add('fa-plus');
      }
    });
  });
});
