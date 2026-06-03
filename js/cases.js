/**
 * ============================================
 * Foshan ZY Furniture - 项目案例页特有JavaScript
 * ============================================
 * 说明：此文件包含项目案例页特有的交互功能
 * 依赖：需要先引入 common.js
 * ============================================
 */

/**
 * ============================================
 * DOM加载完成后的初始化
 * ============================================
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化案例页特有功能
    initFilter();
    initCaseCards();
    initStatsAnimation();
});

/**
 * ============================================
 * 筛选功能
 * ============================================
 * 处理案例分类筛选
 */
function initFilter() {
    const filterItems = document.querySelectorAll('.filter-item');
    const caseCards = document.querySelectorAll('.case-card');
    
    if (filterItems.length === 0) return;
    
    filterItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // 移除所有active状态
            filterItems.forEach(function(filter) {
                filter.classList.remove('active');
            });
            
            // 添加active状态到当前项
            this.classList.add('active');
            
            // 获取筛选类型
            const filterType = this.dataset.filter;
            
            // 筛选案例卡片
            caseCards.forEach(function(card) {
                const cardCategory = card.dataset.category;
                
                if (filterType === 'all' || cardCategory === filterType) {
                    // 显示卡片
                    card.style.display = 'block';
                    setTimeout(function() {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    // 隐藏卡片
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(function() {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * ============================================
 * 案例卡片交互
 * ============================================
 * 处理案例卡片的入场动画和点击事件
 */
function initCaseCards() {
    const caseCards = document.querySelectorAll('.case-card');
    const viewButtons = document.querySelectorAll('.case-view-btn');
    
    if (caseCards.length === 0) return;
    
    // 创建Intersection Observer用于入场动画
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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 设置初始样式并观察卡片
    caseCards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // 查看项目按钮点击事件
    viewButtons.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            event.stopPropagation();
            
            // 获取案例标题
            const caseCard = this.closest('.case-card');
            const caseTitle = caseCard.querySelector('.case-title').textContent;
            
            // 显示提示
            showNotification('正在加载 ' + caseTitle + ' 的详细信息...');
        });
    });
}

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
 * 通知提示功能
 * ============================================
 * @param {string} message - 通知消息
 */
function showNotification(message) {
    // 移除已有的通知
    const existingNotification = document.querySelector('.cases-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'cases-notification';
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background-color: var(--text-dark);
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 9999;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 显示动画
    requestAnimationFrame(function() {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    });
    
    // 自动隐藏
    setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 2000);
}