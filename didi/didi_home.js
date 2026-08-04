let body = $response.body;

try {
    let obj = JSON.parse(body);

    // 检查是否有 data 数组
    if (obj && Array.isArray(obj.data)) {
        
        // 使用 filter 直接剔除不要的模块
        obj.data = obj.data.filter(item => {
            if (item && item.promotion_position_mark) {
                let mark = item.promotion_position_mark;
                
                // 拦截规则：命中这些标识的，直接 return false 丢弃
                if (mark === 'es_app_home_banner' || 
                    mark === 'es_app_index_activity_banner' || 
                    mark === 'es_app_index_activity_point_banner') {
                    return false; 
                }
            }
            return true; // 其他正常模块保留
        });

        body = JSON.stringify(obj);
    }
} catch (e) {
    console.log("滴滴企业版去广告脚本解析失败: " + e);
}

$done({ body });
