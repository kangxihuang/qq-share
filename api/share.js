module.exports = (req, res) => {
    const title = req.query.title || '欢迎加入群聊';
    const desc = req.query.desc || '快来加入我们吧！';
    const url = req.query.url || '';
    const icon = req.query.icon || '';

    function e(s) {
        return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    const t = e(title);
    const d = e(desc);
    const u = e(url);
    const i = icon ? e(icon) : '';

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${t}</title>
<meta name="description" content="${d}">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:type" content="article">
<meta property="og:url" content="https://qq-share-two.vercel.app/s">
${i ? `<meta property="og:image" content="${i}">` : ''}
<meta property="og:site_name" content="${t}">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta itemprop="name" content="${t}">
<meta itemprop="description" content="${d}">
</head>
<body>
<h1>${t}</h1>
<p>${d}</p>
<a href="${u}">加入</a>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).send(html);
};
