export const config = { runtime: 'edge' };

export default function handler(req) {
    const url = new URL(req.url);
    const title = (url.searchParams.get('title') || '欢迎加入群聊').slice(0, 30);
    const desc = (url.searchParams.get('desc') || '快来加入我们吧！').slice(0, 40);
    const target = url.searchParams.get('url') || '';
    const icon = url.searchParams.get('icon') || 'http://gtimg.cn/qqshow/admindata/comdata/svipNew_BigPic_BG_2/2.jpg';

    function e(s) {
        return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    const t = e(title);
    const d = e(desc);
    const u = e(target);
    const i = e(icon);

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${t}</title>
<meta itemprop="name" content="${t}">
<meta itemprop="image" content="${i}">
<meta name="description" itemprop="description" content="${d}">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:image" content="${i}">
<meta property="og:type" content="website">
<meta http-equiv="refresh" content="0;url=${u}">
</head>
<body>
<h1>${t}</h1>
<p>${d}</p>
<img src="${i}" alt="${t}">
<a href="${u}">${t}</a>
</body>
</html>`;

    return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
}
