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

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${t}</title>
<meta name="description" content="${d}">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:type" content="website">
${icon ? `<meta property="og:image" content="${e(icon)}">` : ''}
<meta http-equiv="refresh" content="0;url=${u}">
</head>
<body>${d}</body>
</html>`;

    return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
}
