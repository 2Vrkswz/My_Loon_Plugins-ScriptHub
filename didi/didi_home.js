let body = $response.body;

try {
    let obj = JSON.parse(body);

    // 检查是否有 data 数组
    if (obj && Array.isArray(obj.data)) {
        
        // 直接将所有的营销活动数据清空，包括顶部横幅、浮窗等
        obj.data = [];

        body = JSON.stringify(obj);
    }
} catch (e) {
    console.log("滴滴企业版去广告脚本解析失败: " + e);
}

$done({ body });
