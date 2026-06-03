/**
 * ============================================
 * Foshan Fly Equipment - 关于我们页特有JavaScript
 * ============================================
 * 说明：此文件包含关于我们页特有的交互功能
 * 依赖：需要先引入 common.js
 * ============================================
 */

/**
 * ============================================
 * DOM加载完成后的初始化
 * ============================================
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化关于我们页特有功能
    initStatsAnimation();
    initCardAnimations();
});

/**
 * ============================================
 * 统计数据动画
 * ============================================
 * 数字从0滚动到目标值的动画效果
 */
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;
    
    // 创建Intersection Observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                // 提取数字和单位
                const match = text.match(/(\d+)(.*)/);
                if (match) {
                    const targetNumber = parseInt(match[1], 10);
                    const suffix = match[2];
                    
                    // 执行数字滚动动画
                    animateNumber(element, 0, targetNumber, 1500, suffix);
                }
                
                // 动画完成后取消观察
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.5
    });
    
    // 观察所有统计数字元素
    statNumbers.forEach(function(stat) {
        observer.observe(stat);
    });
}

/**
 * 数字滚动动画函数
 * @param {Element} element - 目标元素
 * @param {number} start - 起始值
 * @param {number} end - 目标值
 * @param {number} duration - 动画持续时间（毫秒）
 * @param {string} suffix - 数字后缀（如"+"、"年"等）
 */
function animateNumber(element, start, end, duration, suffix) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // 使用缓动函数使动画更自然
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * ============================================
 * 卡片入场动画
 * ============================================
 * 使命愿景和核心价值观卡片的入场动画
 */
function initCardAnimations() {
    const cards = document.querySelectorAll('.mv-card, .cv-card');
    
    if (cards.length === 0) return;
    
    // 创建Intersection Observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // 添加延迟，使卡片依次出现
                setTimeout(function() {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 100);
                
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 设置初始样式并观察卡片
    cards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}