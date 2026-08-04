let body = $response.body;

try {
    let obj = JSON.parse(body);

    // 检查是否有 data 数组
    if (obj && Array.isArray(obj.data)) {
        
        // 我们不直接删除数组元素，而是把符合“广告”或“小福包”特征的模块内容置空
        // 这样可以避免破坏 App 预期的数组长度，减少崩溃的风险
        
        obj.data = obj.data.map(item => {
            if (item && typeof item.promotion_position_mark === 'string') {
                let mark = item.promotion_position_mark;
                
                // 拦截规则：如果标识是首页banner、活动banner或者小福包的banner
                if (mark === 'es_app_home_banner' || 
                    mark === 'es_app_index_activity_banner' || 
                    mark === 'es_app_index_activity_point_banner') {
                    
                    // 将这个模块里面的元素清空，让 App 渲染不出东西
                    item.element = {};
                }
            }
            return item;
        });

        // 重新转回字符串
        body = JSON.stringify(obj);
    }
} catch (e) {
    console.log("滴滴企业版去广告脚本解析失败: " + e);
}

$done({ body });