// status.js - status.html ページ専用スクリプト

(function() {
  const statusEl = document.getElementById('status-message');
  const widget = document.getElementById('discord-widget');
  const inviteLinks = document.querySelectorAll('.sns-icons a');
  const fallbackInvite = 'https://discord.gg/X2jYXPETRq';

  function updateStatus(text, type) {
    statusEl.textContent = text;
    statusEl.className = `status ${type}`;
  }

  async function checkServer() {
    try {
      const res = await fetch('https://discord.com/api/guilds/1054832544845135934/widget.json');
      if (!res.ok) throw new Error('Network response was not OK');
      updateStatus('🟢 サーバーは正常に動作しています', 'success');
    } catch (error) {
      updateStatus('❌ サーバーが削除されています。避難所へ移動してください', 'error');
      widget.src = 'https://discord.com/widget?id=1292205597076230144&theme=dark';
      // 更新が必要なInviteリンク
      inviteLinks.forEach(a => {
        if (a.href.includes('https://discord.gg/JRPRpcaNau')) a.href = fallbackInvite;
      });
    }
  }

  inviteLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      window.open(a.href, '_blank');
    });
  });

  // 初回チェック & 定期更新
  checkServer();
  setInterval(checkServer, 60000);
})();