// didi_ads_remove.js
let body = $response.body;

try {
    let obj = JSON.parse(body);
    
    // 统一拦截并清空 data 节点
    if (obj.data) {
        if (Array.isArray(obj.data)) {
            // 针对 list/v4 (小福包) 和部分 batchList/v1 返回数组的情况
            obj.data = []; 
        } else if (typeof obj.data === 'object') {
            // 兼容 batchList/v1 返回对象的情况，将其内部的所有数组节点清空
            Object.keys(obj.data).forEach(key => {
                if (Array.isArray(obj.data[key])) {
                    obj.data[key] = [];
                }
            });
        }
    }
    
    body = JSON.stringify(obj);
} catch (e) {
    console.log("滴滴企业版去广告解析失败: " + e);
}

$done({ body });
