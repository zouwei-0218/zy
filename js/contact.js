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
    initContactForm();
    initSocialButtons();
});

/**
 * ============================================
 * 联系表单功能
 * ============================================
 * 处理表单验证和提交
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // 获取表单数据
        let formData = new FormData(form);
        let data = Object.fromEntries(formData.entries());
        
        // 验证必填字段
        let isValid = true;
        const requiredFields = ['user_name', 'user_email', 'user_country', 'user_message'];
        
        requiredFields.forEach(function(field) {
            if (!data[field] || data[field].trim() === '') {
                isValid = false;
                const input = form.querySelector('[name="' + field + '"]');
                if (input) {
                    input.style.borderColor = '#dc2626';
                    setTimeout(function() {
                        input.style.borderColor = '';
                    }, 3000);
                }
            }
        });
        
        // 验证邮箱格式
        if (data.email && !FoshanFlyUtils.FormValidator.isEmail(data.email)) {
            isValid = false;
            const emailInput = document.getElementById('email');
            if (emailInput) {
                emailInput.style.borderColor = '#dc2626';
                setTimeout(function() {
                    emailInput.style.borderColor = '';
                }, 3000);
            }
        }
        
        if (!isValid) {
            showNotification('请填写所有必填字段');
            return;
        }
        
        // 模拟提交
        // 1. 初始化 Public Key
        emailjs.init("zovN2ceDxO5PBgCrk"); 

        // 监听表单提交事件
        data.user_from = "中亿家具";
        
        // 调试：打印发送的数据
        // console.log('发送的数据:', data);
        
        // 2. 调用 send 方法发送邮件
        emailjs.send(
            'service_gq4unos', 
            'template_saszc21', 
            data
        )
        .then(function(response) {
            // console.log('邮件发送成功！', response.status, response.text);
            form.reset();
            alert('感谢您的留言，我们将尽快回复！');
        }, function(error) {
            // console.error('邮件发送失败：', error);
            alert('发送失败，请稍后重试或检查网络。');
        });

        
        // 模拟API调用
        // setTimeout(function() {
        //     showNotification('咨询已提交！我们会尽快与您联系。');
        //     form.reset();
        // }, 1500);
    });
    
    // 输入时移除错误样式
    const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            this.style.borderColor = '';
        });
        
        input.addEventListener('change', function() {
            this.style.borderColor = '';
        });
    });
}

/**
 * ============================================
 * 社交分享按钮功能
 * ============================================
 */
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