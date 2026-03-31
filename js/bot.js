// bot.js - bot.html ページ専用スクリプト

document.addEventListener('DOMContentLoaded', () => {
  // 1ファイル内で mode を切り替え（external / nuke）
  const params = new URLSearchParams(window.location.search);
  const mode = (params.get('mode') || '').toLowerCase();

  const context = {
    external: {
      pageTitle: '外部アプリBot解説',
      description: 'マイアプリ経由で動作する外部アプリ版コマンドだけを表示します。',
      ogTitle: '外部アプリBot解説',
      ogDescription: '外部アプリ（/通常攻撃, /操作, /TOKEN設定, /ログアウト）に特化した説明ページ。',
      ogImage: 'https://i.ibb.co/MknjZBVr/Freeze-logo.png'
    },
    nuke: {
      pageTitle: 'NukeBot解説',
      description: 'Nuke系のサーバー内コマンド（!nuke, !allban など）だけを表示します。',
      ogTitle: 'NukeBot解説',
      ogDescription: 'サーバー破壊系コマンドに特化した説明ページ。',
      ogImage: 'https://i.ibb.co/MknjZBVr/Freeze-logo.png'
    }
  };

  const cfg = context[mode] || {
    pageTitle: '荒らしBot導入ガイド',
    description: '外部アプリ版またはNuke版を選択してください。',
    ogTitle: '荒らしBot使い方',
    ogDescription: '外部アプリ版とNuke版のどちらかを選択して詳細情報を表示します。'
  };

  // body にモードクラスを付与（CSSでモード別スタイル設定できるように）
  document.body.classList.add('bot-page');
  document.body.classList.remove('external', 'nuke');
  if (mode === 'external' || mode === 'nuke') {
    document.body.classList.add(mode);
  }

  // mode-list のアクティブ表示制御
  document.querySelectorAll('.mode-card').forEach(card => {
    const link = card.querySelector('.mode-link');
    if (link) {
      const href = link.getAttribute('href');
      const isActive = href && href.includes(mode);
      card.classList.toggle('active', !!isActive);
    }
  });

  document.title = `Freeze公式サイト - ${cfg.pageTitle}`;
  document.querySelector('.page-title').textContent = cfg.pageTitle;

  // ============================================
  // メタタグの動的更新（OGP用）
  // ============================================
  const updateMetaTags = () => {
    // og:title
    const ogTitleMeta = document.getElementById('og-title');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', cfg.ogTitle);
    }

    // og:description
    const ogDescMeta = document.getElementById('og-description');
    if (ogDescMeta) {
      ogDescMeta.setAttribute('content', cfg.ogDescription);
    }

    // og:url（現在のページのURLにmode パラメータを含める）
    const ogUrlMeta = document.getElementById('og-url');
    if (ogUrlMeta) {
      ogUrlMeta.setAttribute('content', window.location.href);
    }

    // og:image
    const ogImageMeta = document.getElementById('og-image');
    if (ogImageMeta && cfg.ogImage) {
      ogImageMeta.setAttribute('content', cfg.ogImage);
    }
  };

  updateMetaTags();

  const modeList = document.getElementById('mode-list');
  const backNav = document.getElementById('back-nav');
  const externalSection = document.querySelector('.external-commands');
  const nukeSection = document.querySelector('.nuke-commands');
  const tabs = document.querySelector('.command-tabs');

  const applyMode = () => {
    if (mode === 'external') {
      if (modeList) modeList.style.display = 'none';
      if (backNav) backNav.style.display = 'block';
      if (tabs) tabs.style.display = 'none';
      if (externalSection) externalSection.classList.add('active');
      if (nukeSection) nukeSection.classList.remove('active');
    } else if (mode === 'nuke') {
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
  };

  applyMode();

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
