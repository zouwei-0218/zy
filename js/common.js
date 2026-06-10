/**
 * ============================================
 * Foshan Fly Equipment - 公共JavaScript
 * ============================================
 * 说明：此文件包含网站所有页面共享的JavaScript功能
 * 功能：导航栏交互、移动端菜单、滚动效果等
 * 维护：修改此文件会影响所有页面，请谨慎操作
 * ============================================
 */

/**
 * ============================================
 * 1. DOM加载完成后的初始化
 * ============================================
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有公共功能
    initNavbar();
    initMobileMenu();
    initScrollEffects();
    initSmoothScroll();

    // 初始化固定浮动按钮和弹窗
    initFloatingButtons();
    initGlobalModal();
});

/**
 * ============================================
 * 2. 导航栏功能
 * ============================================
 * 处理导航栏的滚动效果和状态变化
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // 监听滚动事件，添加/移除scrolled类
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');

        }
    });
    
    // 初始化时检查滚动位置
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    }
}

function toWhatsApp(){
    window.open('https://wa.me/message/5Z5VATVJXTD2C1', '_blank')
}




/**
 * ============================================
 * 3. 移动端菜单功能
 * ============================================
 * 处理移动端汉堡菜单的展开/收起
 */
function initMobileMenu() {
    const toggle = document.querySelector('.navbar-toggle');
    const nav = document.querySelector('.navbar-nav');
    
    if (!toggle || !nav) return;
    
    // 点击菜单按钮切换菜单状态
    toggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        toggle.setAttribute('aria-expanded', nav.classList.contains('active'));
    });
    
    // 点击导航链接后自动关闭菜单
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // 点击页面其他区域关闭菜单
    document.addEventListener('click', function(event) {
        if (!toggle.contains(event.target) && !nav.contains(event.target)) {
            nav.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * ============================================
 * 4. 滚动效果
 * ============================================
 * 处理页面滚动时的各种动画和效果
 */
function initScrollEffects() {
    // 获取所有需要动画的元素
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    if (animatedElements.length === 0) return;
    
    // 创建Intersection Observer实例
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // 动画只触发一次，取消观察
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // 观察所有需要动画的元素
    animatedElements.forEach(function(element) {
        observer.observe(element);
    });
}

/**
 * ============================================
 * 5. 平滑滚动
 * ============================================
 * 处理锚点链接的平滑滚动效果
 */
function initSmoothScroll() {
    // 获取所有锚点链接
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // 忽略空锚点
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                event.preventDefault();
                
                // 计算目标位置（考虑固定导航栏高度）
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                // 执行平滑滚动
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * ============================================
 * 6. 工具函数
 * ============================================
 * 常用的JavaScript工具函数
 */

/**
 * 防抖函数
 * @param {Function} func - 要执行的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * 节流函数
 * @param {Function} func - 要执行的函数
 * @param {number} limit - 限制时间（毫秒）
 * @returns {Function} 节流后的函数
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(function() {
                inThrottle = false;
            }, limit);
        }
    };
}

/**
 * 检查元素是否在视口内
 * @param {Element} element - 要检查的元素
 * @returns {boolean} 是否在视口内
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * 格式化数字（添加千位分隔符）
 * @param {number} num - 要格式化的数字
 * @returns {string} 格式化后的字符串
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} 是否复制成功
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('复制失败:', err);
        return false;
    }
}

/**
 * ============================================
 * 7. 表单验证工具
 * ============================================
 * 常用的表单验证函数
 */
const FormValidator = {
    /**
     * 验证邮箱格式
     * @param {string} email - 邮箱地址
     * @returns {boolean} 是否有效
     */
    isEmail: function(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    /**
     * 验证手机号（中国大陆）
     * @param {string} phone - 手机号
     * @returns {boolean} 是否有效
     */
    isPhone: function(phone) {
        const regex = /^1[3-9]\d{9}$/;
        return regex.test(phone);
    },
    
    /**
     * 验证是否为空
     * @param {string} value - 要验证的值
     * @returns {boolean} 是否为空
     */
    isEmpty: function(value) {
        return !value || value.trim() === '';
    },
    
    /**
     * 验证最小长度
     * @param {string} value - 要验证的值
     * @param {number} min - 最小长度
     * @returns {boolean} 是否符合要求
     */
    minLength: function(value, min) {
        return value && value.length >= min;
    },
    
    /**
     * 显示错误信息
     * @param {Element} element - 表单元素
     * @param {string} message - 错误信息
     */
    showError: function(element, message) {
        // 移除已有的错误信息
        this.clearError(element);
        
        // 添加错误样式
        element.classList.add('error');
        
        // 创建错误信息元素
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        // 插入到元素后面
        element.parentNode.insertBefore(errorElement, element.nextSibling);
    },
    
    /**
     * 清除错误信息
     * @param {Element} element - 表单元素
     */
    clearError: function(element) {
        element.classList.remove('error');
        const errorElement = element.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
};

// 导出工具函数供其他脚本使用
window.FoshanFlyUtils = {
    debounce: debounce,
    throttle: throttle,
    isInViewport: isInViewport,
    formatNumber: formatNumber,
    copyToClipboard: copyToClipboard,
    FormValidator: FormValidator
};



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
        if (data.user_email && !FoshanFlyUtils.FormValidator.isEmail(data.user_email)) {
            isValid = false;
            const emailInput = document.getElementById('user_email');
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
 * 固定浮动按钮功能
 * ============================================
 * 在所有页面右下角显示两个固定按钮
 */
function initFloatingButtons() {
    // 创建浮动按钮容器
    const floatingButtons = document.createElement('div');
    floatingButtons.className = 'floating-buttons';

    // WhatsApp按钮包装器
    const whatsappWrapper = document.createElement('div');
    whatsappWrapper.className = 'floating-btn-wrapper';

    // WhatsApp按钮
    const whatsappBtn = document.createElement('button');
    whatsappBtn.className = 'floating-btn floating-btn-whatsapp';
    whatsappBtn.setAttribute('aria-label', '联系我们');
    whatsappBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
    `;
    whatsappBtn.addEventListener('click', function() {
        toWhatsApp();
    });

    // WhatsApp提示
    const whatsappTooltip = document.createElement('span');
    whatsappTooltip.className = 'floating-btn-tooltip';
    whatsappTooltip.textContent = 'WhatsApp To Us';

    whatsappWrapper.appendChild(whatsappBtn);
    whatsappWrapper.appendChild(whatsappTooltip);

    // 表单按钮包装器
    const formWrapper = document.createElement('div');
    formWrapper.className = 'floating-btn-wrapper';

    // 表单按钮
    const formBtn = document.createElement('button');
    formBtn.className = 'floating-btn floating-btn-form';
    formBtn.setAttribute('aria-label', '打开咨询表单');
    formBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
    `;
    formBtn.addEventListener('click', function() {
        openGlobalModal();
    });

    // 表单提示
    const formTooltip = document.createElement('span');
    formTooltip.className = 'floating-btn-tooltip';
    formTooltip.textContent = 'Speak to Us';

    formWrapper.appendChild(formBtn);
    formWrapper.appendChild(formTooltip);

    // 添加按钮到容器
    floatingButtons.appendChild(whatsappWrapper);
    floatingButtons.appendChild(formWrapper);

    // 添加到页面
    document.body.appendChild(floatingButtons);
}

/**
 * ============================================
 * 全局弹窗功能
 * ============================================
 * 在所有页面添加咨询表单弹窗
 */
function initGlobalModal() {
    // 确定logo路径（根据当前页面位置）
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes('/pages/') || currentPath.includes('/cases/') || currentPath.includes('/products/') || currentPath.includes('/about/') || currentPath.includes('/contact/') || currentPath.includes('/book/');
    const logoPath = isInSubfolder ? '../static/images/logo1.png' : './static/images/logo1.png';

    // 创建弹窗HTML
    const modalHTML = `
        <div class="modal-overlay" id="globalModal">
            <div class="modal-container">
                <button class="modal-close" onclick="closeGlobalModal()" aria-label="关闭弹窗">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>

                <div class="modal-content">
                    <!-- 左侧信息区域 -->
                    <div class="modal-left">
                        <div class="modal-brand">
                            <img src="${logoPath}" width="40" height="40" alt="Foshan ZY Furniture Logo"/>
                            <span>Foshan ZY Furniture</span>
                        </div>

                        <h2 class="modal-title">Send Us Your Floor Plan for a Preliminary Project Review</h2>

                        <p class="modal-description">
                            Planning a restaurant, café, bar, or hospitality project? Share your floor plan and project requirements with us. Our team will review your project and contact you within 48 hours.
                        </p>

                        <p class="modal-description">
                            We offer end-to-end solutions covering layout planning, 3D visualizations, furniture sourcing, lighting selection, and building material procurement—helping you create a functional, attractive, and cost-effective commercial space.
                        </p>

                        <div class="modal-contact-info">
                            <button class="modal-whatsapp-btn" onclick="toWhatsApp()">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                                WhatsApp Us
                            </button>

                            <div class="modal-contact-list">
                                <div class="modal-contact-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                    <span>+86 18923123804</span>
                                </div>
                                <div class="modal-contact-item">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                                        <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                    </svg>
                                    <span>info@zyfurniture.com</span>
                                </div>
                                <div class="modal-contact-item" style="align-items: start;">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                    <span>No. 37 Xingye Road, Shunde District, Foshan City, Guangdong Province, China</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 右侧表单区域 -->
                    <div class="modal-right">
                        <form class="modal-form" id="globalModalForm">
                            <div class="form-group">
                                <input type="text" name="user_name" class="form-input" placeholder="Your Name*" required>
                                <span class="input-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                        <circle cx="12" cy="7" r="4"/>
                                    </svg>
                                </span>
                            </div>

                            <div class="form-group">
                                <input type="email" name="user_email" class="form-input" placeholder="Your Email*" required>
                                <span class="input-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="2" y="4" width="20" height="16" rx="2"/>
                                        <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                                    </svg>
                                </span>
                            </div>

                            <div class="form-group">
                                <input type="tel" name="user_phone" class="form-input" placeholder="Your Phone">
                                <span class="input-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                                    </svg>
                                </span>
                            </div>

                            <div class="form-group">
                                <input type="text" name="user_country" class="form-input" placeholder="Your Country*" required>
                                <span class="input-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                        <circle cx="12" cy="10" r="3"/>
                                    </svg>
                                </span>
                            </div>

                            <div class="form-group">
                                <textarea name="user_message" class="form-textarea" placeholder="Just share your project details, current stage, floor plan, or the products you are looking for..." required></textarea>
                            </div>

                            <button type="submit" class="modal-submit-btn">
                                Speak to Us
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 添加弹窗到页面
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 初始化弹窗事件
    const modal = document.getElementById('globalModal');
    const form = document.getElementById('globalModalForm');

    // 点击蒙版关闭弹窗
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeGlobalModal();
            }
        });
    }

    // 表单提交处理
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            submitGlobalModalForm();
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
}

/**
 * 打开全局弹窗
 */
function openGlobalModal() {
    const modal = document.getElementById('globalModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * 关闭全局弹窗
 */
function closeGlobalModal() {
    const modal = document.getElementById('globalModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * 提交全局弹窗表单
 */
function submitGlobalModalForm() {
    const form = document.getElementById('globalModalForm');
    const submitBtn = form?.querySelector('button[type="submit"]');
    const originalText = submitBtn?.innerHTML || 'Submit';

    if (!form) return;

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
    if (data.user_email && !FoshanFlyUtils.FormValidator.isEmail(data.user_email)) {
        isValid = false;
        const emailInput = form.querySelector('[name="user_email"]');
        if (emailInput) {
            emailInput.style.borderColor = '#dc2626';
            setTimeout(function() {
                emailInput.style.borderColor = '';
            }, 3000);
        }
    }

    if (!isValid) {
        showGlobalNotification('请填写所有必填字段');
        return;
    }

    // 禁用按钮防止重复提交
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
    }

    // 设置来源
    data.user_from = "中亿家具";

    // 检查是否存在 emailjs
    if (typeof emailjs !== 'undefined') {
        // 初始化 Public Key
        emailjs.init("zovN2ceDxO5PBgCrk");

        // 调用 emailjs 发送邮件
        emailjs.send('service_gq4unos', 'template_saszc21', data)
            .then(function(response) {
                showGlobalNotification('感谢您的留言，我们将尽快回复！');
                form.reset();
                closeGlobalModal();
            }, function(error) {
                showGlobalNotification('发送失败，请稍后重试或检查网络。');
            })
            .finally(function() {
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            });
    } else {
        // 如果 emailjs 未加载，显示提示
        setTimeout(function() {
            showGlobalNotification('感谢您的留言，我们将尽快回复！');
            form.reset();
            closeGlobalModal();
            if (submitBtn) {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        }, 1500);
    }
}

/**
 * 显示全局通知
 * @param {string} message - 通知消息
 */
function showGlobalNotification(message) {
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