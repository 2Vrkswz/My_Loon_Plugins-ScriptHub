/**
 * Loon 版 网易云 VIP Cookie 获取脚本
 * 类型：script-request
 */

if (!$request || !$request.headers) {
  $done({});
  return;
}

const headers = $request.headers;
const cookie = headers.Cookie || headers.cookie;

if (!cookie) {
  $notify(
    "网易云 Cookie",
    "获取失败",
    "未在请求头中发现 Cookie"
  );
  $done({});
  return;
}

$persistentStore.write(cookie, "wyy_cookie");

$notify(
  "网易云 Cookie",
  "获取成功 🎉",
  "已保存 VIP Cookie，可关闭插件开关"
);

$done({});