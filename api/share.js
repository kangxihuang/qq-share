export const config = { runtime: 'edge' };

export default function handler(req) {
    const u = new URL(req.url);
    const title = (u.searchParams.get('title') || '加拿大 宋茶28-888').slice(0, 30);
    const desc = (u.searchParams.get('desc') || '+旺旺1111166').slice(0, 40);
    const target = u.searchParams.get('url') || 'https://qun.qq.com/universal-share/share?ac=1&authKey=19P%2F69sD8kzXgYfxGZJABerbINvBi9%2Fv69aVp%2F5Gdfprs4wH%2BNVUUXwoyWJq8XJ6&busi_data=eyJncm91cENvZGUiOiI4NjE1MjM3MjYiLCJ0b2tlbiI6IkI4TVczLzdwYkRXWGY5bDZYQ0dLdVlVYUxQQy9PMGJ3djI5dU15ZldVREhSVEFoYUhKNldYVEs0MXV2MHYrMzkiLCJ1aW4iOiI0MjgzODE3NTgifQ%3D%3D&data=1Xi6HXqxkvWtBZZ1ACG_x0hx43KuwhHYUd0c6OsB4hrRsofsXpxgvmW-ftYicV3Qs1PMXZL7p25klNyyKUsiIA&svctype=4&tempid=h5_group_info';
    const img = u.searchParams.get('img') || 'http://p.qlogo.cn/gh/861523726/861523726/640/';
    const appName = u.searchParams.get('app') || '加拿大28';

    function e(s) {
        return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;');
    }

    const t = e(title);
    const d = e(desc);
    const tgt = e(target);
    const i = e(img);
    const an = e(appName);

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${t}</title>
<meta itemprop="name" content="${t}">
<meta itemprop="description" content="${d}">
<meta itemprop="image" content="${i}">
<meta name="description" content="${d}">
<meta property="og:title" content="${t}">
<meta property="og:description" content="${d}">
<meta property="og:image" content="${i}">
<meta property="og:type" content="website">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,"PingFang SC","Microsoft YaHei",sans-serif;background:linear-gradient(135deg,#667eea,#764ba2);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.card{background:#fff;border-radius:20px;padding:36px 28px 32px;max-width:380px;width:100%;text-align:center;box-shadow:0 24px 70px rgba(0,0,0,.25)}
.avatar{width:96px;height:96px;border-radius:50%;margin:0 auto 18px;display:block;object-fit:cover}
h1{font-size:22px;color:#1a1a1a;margin-bottom:10px;font-weight:700}
.desc{font-size:16px;color:#666;line-height:1.6;margin-bottom:28px}
.btn{display:block;width:100%;border:none;color:#fff;text-decoration:none;padding:15px 0;border-radius:50px;font-size:16px;font-weight:600;margin-bottom:14px;cursor:pointer;font-family:inherit}
.btn:active{transform:scale(.97)}
.btn-primary{background:linear-gradient(135deg,#12B7F5,#0099FF);box-shadow:0 8px 20px rgba(0,153,255,.35)}
.btn-secondary{background:linear-gradient(135deg,#43e97b,#38f9d7);color:#064;box-shadow:0 8px 20px rgba(67,233,123,.35)}
.tips{margin-top:18px;font-size:12px;color:#999;line-height:1.5}
</style>
</head>
<body>
<div style="position:absolute;left:-99999px;top:-99999px;width:1px;height:1px;overflow:hidden">
<img src="${i}" width="300" height="300" alt="${t}">
<h2>${t}</h2>
<p>${d}</p>
</div>

<div class="card">
<img class="avatar" src="${i}" alt="群头像">
<h1>${t}</h1>
<p class="desc">${d}</p>
<button class="btn btn-primary" id="shareBtn" type="button">分享给 QQ 好友</button>
<a class="btn btn-secondary" id="joinBtn" href="${tgt}">加入群聊</a>
<p class="tips">点击「分享给 QQ 好友」直接唤起 QQ 并附带自定义标题、描述、图片</p>
</div>

<script>
(function(){
    var SHARE_TITLE = ${JSON.stringify(title)};
    var SHARE_DESC  = ${JSON.stringify(desc)};
    var SHARE_IMG   = ${JSON.stringify(img)};
    var SHARE_URL   = ${JSON.stringify(target)};
    var APP_NAME    = ${JSON.stringify(appName)};
    var SHARE_ID    = '1105471055';

    function b64(s){
        return btoa(unescape(encodeURIComponent(s))).replace(/\\+/g,'%2B');
    }

    function buildQs(){
        return [
            'file_type=news',
            'src_type=web',
            'version=1',
            'generalpastboard=1',
            'share_id=' + SHARE_ID,
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
                alert('唤起 QQ 失败,可能未安装 QQ 或被拦截。可以复制地址栏链接直接发给 QQ。');
            }
        }, 3000);
    });
})();
</script>
</body>
</html>`;

    return new Response(html, {
        headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
}
