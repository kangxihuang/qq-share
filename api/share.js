module.exports = (req, res) => {
    const title = req.query.title || '欢迎加入群聊';
    const desc = req.query.desc || '快来加入我们吧！';
    const url = req.query.url || '#';
    const icon = req.query.icon || '';

    const iconMeta = icon
        ? `<meta property="og:image" content="${escape(icon)}">\n    <link rel="icon" href="${escape(icon)}">`
        : '';

    function escape(s) {
        return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    const t = escape(title);
    const d = escape(desc);
    const u = escape(url);

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
    ${iconMeta}
    <meta name="description" content="${d}">
    <meta itemprop="name" content="${t}">
    <meta itemprop="description" content="${d}">
    <style>
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:-apple-system,sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);min-height:100vh;display:flex;align-items:center;justify-content:center}
        .card{background:#fff;border-radius:16px;padding:40px 30px;max-width:360px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.2)}
        h1{font-size:22px;color:#333;margin-bottom:10px}
        p{font-size:15px;color:#666;line-height:1.6;margin-bottom:24px}
        .btn{display:inline-block;background:linear-gradient(135deg,#12B7F5,#0099FF);color:#fff;text-decoration:none;padding:14px 40px;border-radius:50px;font-size:16px;font-weight:600}
    </style>
</head>
<body>
    <div class="card">
        <h1>${t}</h1>
        <p>${d}</p>
        <a class="btn" href="${u}">立即加入</a>
    </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.status(200).send(html);
};
