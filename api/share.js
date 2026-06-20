module.exports = (req, res) => {
    const title = req.query.title || '欢迎加入群聊';
    const desc = req.query.desc || '快来加入我们吧！';
    const url = req.query.url || '';
    const icon = req.query.icon || 'https://qq-share-two.vercel.app/qq-icon.png';

    function e(s) {
        return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    const t = e(title);
    const d = e(desc);
    const u = e(url);

    const qqShareUrl = `mqqapi://share/to_fri?src_type=web&version=1&file_type=news&title=${encodeURIComponent(title)}&description=${encodeURIComponent(desc)}&url=${encodeURIComponent(url)}&image_url=${encodeURIComponent(icon)}`;

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t}</title>
    <meta property="og:title" content="${t}">
    <meta property="og:description" content="${d}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${t}">
    <meta name="description" content="${d}">
    <meta itemprop="name" content="${t}">
    <meta itemprop="description" content="${d}">
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:-apple-system,sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);min-height:100vh;display:flex;align-items:center;justify-content:center}
        .card{background:#fff;border-radius:16px;padding:40px 24px;max-width:360px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.2)}
        h1{font-size:22px;color:#333;margin-bottom:10px}
        p{font-size:15px;color:#666;line-height:1.6;margin-bottom:20px}
        .btn{display:block;width:100%;padding:14px;border:none;border-radius:50px;font-size:16px;font-weight:600;cursor:pointer;margin-bottom:10px;text-decoration:none;text-align:center}
        .btn-qq{background:linear-gradient(135deg,#12B7F5,#0099FF);color:#fff}
        .btn-join{background:#f5f5f5;color:#333}
        .tip{font-size:12px;color:#999;margin-top:14px;line-height:1.5}
    </style>
</head>
<body>
    <div class="card">
        <h1>${t}</h1>
        <p>${d}</p>
        <a class="btn btn-qq" href="${qqShareUrl}" id="shareBtn">分享到QQ好友</a>
        <a class="btn btn-join" href="${u}">直接加入群聊</a>
        <div class="tip">点击"分享到QQ好友"会打开QQ并显示自定义标题和描述</div>
    </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);
};
