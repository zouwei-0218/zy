/**
 * ============================================
 * Foshan Fly Equipment - 联系我们页特有JavaScript
 * ============================================
 * 说明：此文件包含联系我们页特有的交互功能
 * 依赖：需要先引入 common.js
 * ============================================
 */

/**
 * ============================================
 * DOM加载完成后的初始化
 * ============================================
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化联系我们页特有功能
    // initContactForm();
    initSocialButtons();
    initRequiredFieldMarkers();
});


// /**
//  * ============================================
//  * 社交分享按钮功能
//  * ============================================
//  */
/**
 * ============================================
 * 为必填字段的label添加红色星号标记
 * ============================================
 * 自动为所有带有required属性的input元素对应的label添加红色星号
 */
function initRequiredFieldMarkers() {
    // 获取所有带有required属性的input元素
    const requiredInputs = document.querySelectorAll('input[required], textarea[required]');
    
    requiredInputs.forEach(function(input) {
        // 获取input的id属性
        const inputId = input.getAttribute('id');
        
        // 如果input有id，找到对应的label
        if (inputId) {
            const label = document.querySelector('label[for="' + inputId + '"]');
            
            if (label) {
                // 检查label是否已经有星号标记
                if (!label.querySelector('.required-marker')) {
                    // 创建星号元素
                    const star = document.createElement('span');
                    star.className = 'required-marker';
                    star.textContent = '*';
                    star.style.cssText = `
                        color: #ff0000;
                        margin-left: 4px;
                    `;
                    
                    // 将星号添加到label末尾
                    label.appendChild(star);
                }
            }
        }
    });
}

function initSocialButtons() {
    const shareBtn = document.querySelector('.social-btn[aria-label="分享"]');
    const printBtn = document.querySelector('.social-btn[aria-label="打印"]');
    
    // 分享功能
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                // 使用Web Share API
                navigator.share({
                    title: 'Foshan Fly Equipment - 联系我们',
                    text: '联系佛山市飞杨设备有限公司，获取行业领先的机械设备和专业技术支持。',
                    url: window.location.href
                }).catch(function(err) {
                    console.log('分享取消');
                });
            } else {
                // 复制链接到剪贴板
                FoshanFlyUtils.copyToClipboard(window.location.href).then(function(success) {
                    if (success) {
                        showNotification('链接已复制到剪贴板');
                    } else {
                        showNotification('复制失败，请手动复制');
                    }
                });
            }
        });
    }
    
    // 打印功能
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
}

/**
 * ============================================
 * 通知提示功能
 * ============================================
 * @param {string} message - 通知消息
 */
function showNotification(message) {
    // 移除已有的通知
    const existingNotification = document.querySelector('.contact-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = 'contact-notification';
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
    }, 3000);
}