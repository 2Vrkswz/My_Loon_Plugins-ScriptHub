/**
 * Loon 版 wyydg 点歌解析脚本
 * 类型：script-response-body
 */

if (!$response || !$response.body) {
  $done({});
  return;
}

let body = $response.body;

try {
  const json = JSON.parse(body);
  $done({ body: JSON.stringify(json) });
} catch (e) {
  $done({ body });
}