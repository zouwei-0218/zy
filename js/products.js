/**
 * ============================================
 * Foshan Fly Equipment - 产品展示页特有JavaScript
 * ============================================
 * 说明：此文件包含产品展示页特有的交互功能
 * 依赖：需要先引入 common.js
 * ============================================
 */

/**
 * ============================================
 * DOM加载完成后的初始化
 * ============================================
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化产品页特有功能
    initCategoryFilter();
    initProductCards();
    initPagination();
    initSpeakToUsModal();
});

/**
 * ============================================
 * 分类筛选功能
 * ============================================
 * 处理产品分类的点击筛选
 */
function initCategoryFilter() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    if (categoryItems.length === 0) return;
    
    categoryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            // 移除所有active类
            categoryItems.forEach(function(cat) {
                cat.classList.remove('active');
            });
            
            // 添加active类到当前项
            this.classList.add('active');
            
            // 获取分类名称
            const categoryName = this.querySelector('span').textContent;
            
            // 这里可以添加筛选逻辑
            filterProducts(categoryName);
        });
    });
}

/**
 * 筛选产品函数
 * @param {string} category - 分类名称
 */
function filterProducts(category) {
    // 获取所有产品卡片
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(function(card) {
        const cardCategory = card.querySelector('.product-category').textContent;
        
        // 简单的淡入淡出效果
        if (category === 'CNC Systems' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(function() {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(function() {
                card.style.display = 'none';
            }, 300);
        }
    });
}

/**
 * ============================================
 * 产品卡片交互
 * ============================================
 * 处理产品卡片的悬停效果和点击事件
 */
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    const productBtns = document.querySelectorAll('.product-btn');
    
    // 产品卡片入场动画
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
    productCards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // 查看详情按钮点击事件
    productBtns.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            event.stopPropagation();
            
            // 获取产品名称
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            // 显示提示（实际项目中可以打开产品详情弹窗或跳转）
            showNotification('正在加载 ' + productName + ' 的详细信息...');
        });
    });
}

/**
 * ============================================
 * 分页功能
 * ============================================
 * 处理分页按钮的点击事件
 */
function initPagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn:not(:disabled)');
    
    if (paginationBtns.length === 0) return;
    
    paginationBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // 获取页码
            const pageText = this.textContent.trim();
            
            // 忽略省略号
            if (pageText === '...') return;
            
            // 更新active状态
            if (!this.querySelector('svg')) {
                // 不是上一页/下一页按钮
                paginationBtns.forEach(function(b) {
                    b.classList.remove('active');
                });
                this.classList.add('active');
            }
            
            // 滚动到产品区域顶部
            const productsContent = document.querySelector('.products-content');
            if (productsContent) {
                const offsetTop = productsContent.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // 这里可以添加加载新页面数据的逻辑
            // loadProducts(pageNumber);
        });
    });
}

/**
 * ============================================
 * 通知提示功能
 * ============================================
 * 显示临时通知消息
 * @param {string} message - 通知消息
 */
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        background-color: var(--text-dark);
        color: white;
        padding: 12px 24px;
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
        notification.style.transform = 'translateX(-50%) translateY(100px)';
        
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 2000);
}

/**
 * ============================================
 * Speak to Us 弹窗功能
 * ============================================
 * 处理弹窗的打开、关闭和表单提交
 */
function initSpeakToUsModal() {
    const modal = document.getElementById('speakToUsModal');
    const form = document.getElementById('modalContactForm');
    
    // 点击蒙版关闭弹窗
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeSpeakToUsModal();
            }
        });
    }
    
    // 表单提交处理
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            submitModalForm();
        });
    }
}

/**
 * 打开弹窗
 */
function openSpeakToUsModal() {
    const modal = document.getElementById('speakToUsModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * 关闭弹窗
 */
function closeSpeakToUsModal() {
    const modal = document.getElementById('speakToUsModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * 提交表单
 */
function submitModalForm() {
    const form = document.getElementById('modalContactForm');
    
    if (!form) return;
    
    // 收集表单数据
    const formData = new FormData(form);
    const data = {};
    formData.forEach(function(value, key) {
        data[key] = value;
    });
    
    // 显示提交中状态
    const submitBtn = form.querySelector('.modal-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle class="animate-spin" cx="12" cy="12" r="10"/></svg> Sending...';
    submitBtn.disabled = true;
    
    // 模拟提交（实际项目中可以使用 emailjs 发送）
    setTimeout(function() {
        // 重置表单
        form.reset();
        
        // 恢复按钮状态
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // 显示成功提示
        showNotification('Message sent successfully! We will contact you within 48 hours.');
        
        // 关闭弹窗
        setTimeout(function() {
            closeSpeakToUsModal();
        }, 2000);
    }, 1500);
}