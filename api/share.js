export const config = { runtime: 'edge' };

export default function handler(req) {
    const u = new URL(req.url);
    const title = (u.searchParams.get('title') || '加拿大 宋茶28-888').slice(0, 30);
    const desc = (u.searchParams.get('desc') || '+旺旺1111166').slice(0, 40);
    const img = u.searchParams.get('img') || 'http://p.qlogo.cn/gh/861523726/861523726/640/';
    const target = u.searchParams.get('url') || 'https://qun.qq.com/universal-share/share?ac=1&authKey=19P%2F69sD8kzXgYfxGZJABerbINvBi9%2Fv69aVp%2F5Gdfprs4wH%2BNVUUXwoyWJq8XJ6&busi_data=eyJncm91cENvZGUiOiI4NjE1MjM3MjYiLCJ0b2tlbiI6IkI4TVczLzdwYkRXWGY5bDZYQ0dLdVlVYUxQQy9PMGJ3djI5dU15ZldVREhSVEFoYUhKNldYVEs0MXV2MHYrMzkiLCJ1aW4iOiI0MjgzODE3NTgifQ%3D%3D&data=1Xi6HXqxkvWtBZZ1ACG_x0hx43KuwhHYUd0c6OsB4hrRsofsXpxgvmW-ftYicV3Qs1PMXZL7p25klNyyKUsiIA&svctype=4&tempid=h5_group_info';
    const appName = u.searchParams.get('app') || '夸克';

    function e(s) {
        return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;');
    }

    const t = e(title);
    const d = e(desc);
    const i = e(img);
    const tgt = e(target);
    const an = e(appName);

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${t}</title>

<!-- QQ 爬虫核心三件套(itemprop) -->
<meta itemprop="name" content="${t}">
<meta name="description" itemprop="description" content="${d}">
<meta itemprop="image" content="${i}">

<!-- 关键字 -->
<meta name="keywords" content="${t}">

<!-- 全平台 Open Graph -->
<meta property="og:type" content="article">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:image" content="${i}">
<meta property="og:image:width" content="640">
<meta property="og:image:height" content="640">
<meta property="og:site_name" content="${an}">

<!-- 多种 icon 兜底 -->
<link rel="icon" href="${i}">
<link rel="shortcut icon" href="${i}">
<link rel="apple-touch-icon" href="${i}">
<link rel="apple-touch-icon-precomposed" sizes="180x180" href="${i}">
<link rel="image_src" href="${i}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${t}">
<meta name="twitter:description" content="${d}">
<meta name="twitter:image" content="${i}">

<style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.card{background:#fff;border-radius:20px;padding:36px 28px 32px;max-width:380px;width:100%;text-align:center;box-shadow:0 24px 70px rgba(0,0,0,.25)}
.avatar{width:120px;height:120px;border-radius:50%;margin:0 auto 18px;display:block;object-fit:cover}
h1{font-size:22px;color:#1a1a1a;margin-bottom:10px;font-weight:700}
.desc{font-size:16px;color:#666;line-height:1.6;margin-bottom:24px}
.btn{display:block;width:100%;border:none;color:#fff;text-decoration:none;padding:15px 0;border-radius:50px;font-size:16px;font-weight:600;margin-bottom:12px;cursor:pointer;font-family:inherit}
.btn:active{transform:scale(.97)}
.btn-primary{background:linear-gradient(135deg,#12B7F5,#0099FF);box-shadow:0 8px 20px rgba(0,153,255,.35)}
.btn-secondary{background:linear-gradient(135deg,#43e97b,#38f9d7);color:#064;box-shadow:0 8px 20px rgba(67,233,123,.35)}
.tips{margin-top:14px;font-size:12px;color:#999;line-height:1.5}
</style>
</head>
<body>

<!-- 爬虫兜底:可见 article 结构(QQ 爬虫优先抓富内容页) -->
<article itemscope itemtype="https://schema.org/Article">
<meta itemprop="headline" content="${t}">
<meta itemprop="description" content="${d}">

<div class="card">
<img class="avatar" src="${i}" alt="${t}" itemprop="image" width="640" height="640">
<h1 itemprop="name">${t}</h1>
<p class="desc" itemprop="description">${d}</p>

<button class="btn btn-primary" id="shareBtn" type="button">分享给 QQ 好友</button>
<a class="btn btn-secondary" href="${tgt}">加入群聊</a>

<p class="tips">点击「分享给 QQ 好友」直接唤起 QQ 附带自定义卡片</p>
</div>
</article>

<script>
(function(){
    var SHARE_TITLE = ${JSON.stringify(title)};
    var SHARE_DESC  = ${JSON.stringify(desc)};
    var SHARE_IMG   = ${JSON.stringify(img)};
    var SHARE_URL   = ${JSON.stringify(target)};
    var APP_NAME    = ${JSON.stringify(appName)};

    function b64(s){
        return btoa(unescape(encodeURIComponent(s))).replace(/\\+/g,'%2B');
    }

    function buildQs(){
        return [
            'file_type=news',
            'src_type=web',
            'version=1',
            'generalpastboard=1',
            'share_id=1105471055',
            'url='              + b64(SHARE_URL),
            'title='            + b64(SHARE_TITLE),
            'description='      + b64(SHARE_DESC),
            'image_url='        + b64(SHARE_IMG),
            'previewimageUrl='  + b64(SHARE_IMG),
            'thirdAppDisplayName=' + b64(APP_NAME),
            'app_name='         + b64(APP_NAME),
            'cflag=0',
            'shareType=0'
        ].join('&');
    }

    document.getElementById('shareBtn').addEventListener('click', function(){
        var qs = buildQs();
        var ua = navigator.userAgent || '';
        var isAndroid = /Android/i.test(ua);
        var target;
        if (isAndroid && /Chrome|Quark|UCBrowser/i.test(ua)) {
            target = 'intent://share/to_fri?' + qs + '#Intent;scheme=mqqapi;package=com.tencent.mobileqq;end';
        } else {
            target = 'mqqapi://share/to_fri?' + qs;
        }
        window.location.href = target;
        setTimeout(function(){
            if (document.visibilityState === 'visible') {
                alert('唤起 QQ 失败,请直接复制地址栏链接发送到 QQ。');
            }
        }, 3000);
    });
})();
</script>

</body>
</html>`;

    return new Response(html, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300'
        }
    });
}
