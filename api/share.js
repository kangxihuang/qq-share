export const config = { runtime: 'edge' };

export default function handler(req) {
    const url = new URL(req.url);
    const title = url.searchParams.get('title') || '欢迎加入群聊';
    const desc = url.searchParams.get('desc') || '快来加入我们吧！';
    const target = url.searchParams.get('url') || '';
    const icon = url.searchParams.get('icon') || '';

    function e(s) {
        return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    const t = e(title);
    const d = e(desc);
    const u = e(target);
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
${i ? `<meta property="og:image" content="${i}">` : ''}
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
</head>
<body>${d}<br><a href="${u}">加入</a></body>
</html>`;

    return new Response(html, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache'
        }
    });
}
