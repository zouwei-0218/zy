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
/**
 * ============================================
 * 产品数据（全局变量）
 * ============================================
 */
const products = {
    Tables:[
        {
            name:'Table 1',
            size:'Medium',
            material:'Wood',
            description:'A table made of wood',
            img_src:'table1.jpg'
        },
        {
            name:'Table 2',
            size:'Large',
            material:'Wood',
            description:'A table made of wood',
            img_src:'table2.jpg'
        },
    ],
    Chairs:[
        {
            name:'Chair 1',
            size:'Medium',
            material:'Wood',
            description:'A comfortable chair made of wood',
            img_src:'chair1.jpg'
        },
        {
            name:'Chair 2',
            size:'Medium',
            material:'Wood',
            description:'A comfortable chair made of wood',
            img_src:'chair2.jpg'  
        },
    ],
    Booths:[
        {
            name:'Booth 1',
            size:'Medium',  
            material:'Wood',
            description:'A comfortable booth made of wood',
            img_src:'booth1.jpg'
        },
        {
            name:'Booth 2',
            size:'Medium',  
            material:'Wood',
            description:'A comfortable booth made of wood',
            img_src:'booth2.jpg'
        },
        {
            name:'Booth 3',
            size:'Medium',  
            material:'Metal',
            description:'A comfortable booth made of metal',
            img_src:'booth3.jpg'    
        },
    ],
    Lights:[
        {
            name:'Light 1', 
            size:'Medium',
            material:'LED',
            description:'A light made of LED technology'
            
        },
        {
            name:'Light 2',
            size:'Medium',
            material:'LED',
            description:'A light made of LED technology'
        },
        {
            name:'Light 3',
            size:'Medium',
            material:'LED',
            description:'A light made of LED',
            img_src:'light3.jpg'
        },
    ],
    'Building Materials':[
        {
            name:'Building Material 1', 
            size:'Medium',
            material:'Wood',
            description:'A building material made of wood',
            img_src:'building1.jpg'
        },
        {
            name:'Building Material 2',
            size:'Medium',
            material:'Wood',
            description:'A comfortable building material made of wood',
            img_src:'building_material2.jpg'
        },
    ]
};

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
    // initSpeakToUsModal();
    
    // 动态加载分类和初始产品
    loadCategories();
    // 默认加载第一个分类的产品
    const firstCategory = Object.keys(products)[0];
    if (firstCategory) {
        renderProducts(firstCategory);
    }
});


/**
 * ============================================
 * 动态加载分类列表
 * ============================================
 * 从products对象动态生成分类选项
 */
function loadCategories() {
    const categoryList = document.querySelector('.category-list');
    if (!categoryList) return;
    
    // 清空现有分类列表
    categoryList.innerHTML = '';
    
    // 获取products对象的所有分类名称
    const categories = Object.keys(products);
    
    categories.forEach(function(categoryName, index) {
        // 创建分类项
        const categoryItem = document.createElement('div');
        categoryItem.className = 'category-item' + (index === 0 ? ' active' : '');
        categoryItem.innerHTML = `
            <span>${categoryName}</span>
            <svg class="category-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
            </svg>
        `;
        
        // 添加点击事件
        categoryItem.addEventListener('click', function() {
            // 移除所有active类
            document.querySelectorAll('.category-item').forEach(function(cat) {
                cat.classList.remove('active');
            });
            // 添加active类到当前项
            this.classList.add('active');
            // 渲染对应分类的产品
            renderProducts(categoryName);
        });
        
        categoryList.appendChild(categoryItem);
    });
}

/**
 * ============================================
 * 根据分类渲染产品卡片
 * ============================================
 * 根据选中的分类动态渲染产品卡片
 */
function renderProducts(categoryName) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    // 获取对应分类的产品列表
    const categoryProducts = products[categoryName] || [];
    
    // 清空现有产品卡片
    productsGrid.innerHTML = '';
    
    // 生成产品卡片
    categoryProducts.forEach(function(product, index) {
        // 创建产品卡片
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-animate', '');
        
        // 生成产品图片（使用默认图片或数据中的图片）
        const imgSrc = product.img_src 
            ? `../static/images/${product.img_src}` 
            : `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=furniture%20${encodeURIComponent(product.name)}%20product%20photo&image_size=portrait_4_3`;
        
        // 设置卡片内容（按顺序展示：图片、分类、名称、材质、尺寸、描述）
        productCard.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${imgSrc}" 
                     alt="${product.name}" 
                     class="product-image"
                     loading="lazy">
            </div>
            <div class="product-content">
                <div class="product-category">${categoryName}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-material">Material: ${product.material}</div>
                <div class="product-size">Size: ${product.size}</div>
                <p class="product-description">${product.description}</p>
            </div>
        `;
        
        // 设置初始样式（用于动画）
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(30px)';
        productCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // 添加到网格
        productsGrid.appendChild(productCard);
        
        // 添加入场动画
        setTimeout(function() {
            productCard.style.opacity = '1';
            productCard.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // 如果分类下没有产品，显示提示
    if (categoryProducts.length === 0) {
        productsGrid.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: #666;">
                <p>No products found in this category.</p>
            </div>
        `;
    }
    
    // 重新绑定产品卡片的点击事件
    initProductCards();
}

/**
 * ============================================
 * 分类筛选功能（保留原函数但不再使用）
 * ============================================
 * 处理产品分类的点击筛选
 */
function initCategoryFilter() {
    // 此函数已被动态加载分类功能替代
    // 保留原函数以保持兼容性
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
 * 处理产品卡片的入场动画效果
 */
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
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
// function initSpeakToUsModal() {
//     const modal = document.getElementById('speakToUsModal');
//     const form = document.getElementById('modalContactForm');
    
//     // 点击蒙版关闭弹窗
//     if (modal) {
//         modal.addEventListener('click', function(event) {
//             if (event.target === modal) {
//                 closeSpeakToUsModal();
//             }
//         });
//     }
    
//     // 表单提交处理
//     if (form) {
//         form.addEventListener('submit', function(event) {
//             event.preventDefault();
//             submitModalForm();
//         });
        
//         // 输入时移除错误样式
//         const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
//         inputs.forEach(function(input) {
//             input.addEventListener('input', function() {
//                 this.style.borderColor = '';
//             });
            
//             input.addEventListener('change', function() {
//                 this.style.borderColor = '';
//             });
//         });
//     }
// }

// /**
//  * 打开弹窗
//  */
// function openSpeakToUsModal() {
//     const modal = document.getElementById('speakToUsModal');
//     if (modal) {
//         modal.classList.add('active');
//         document.body.style.overflow = 'hidden';
//     }
// }

// /**
//  * 关闭弹窗
//  */
// function closeSpeakToUsModal() {
//     const modal = document.getElementById('speakToUsModal');
//     if (modal) {
//         modal.classList.remove('active');
//         document.body.style.overflow = '';
//     }
// }

// /**
//  * 提交表单
//  */
// function submitModalForm() {
//     const form = document.getElementById('modalContactForm');
//     const submitBtn = form?.querySelector('button[type="submit"]');
//     const originalText = submitBtn?.innerHTML || 'Submit';
    
//     if (!form) return;

//     // 获取表单数据
//     let formData = new FormData(form);
//     let data = Object.fromEntries(formData.entries());
    
//     // 验证必填字段
//     let isValid = true;
//     const requiredFields = ['user_name', 'user_email', 'user_country', 'user_message'];
//     requiredFields.forEach(function(field) {
//         if (!data[field] || data[field].trim() === '') {
//             isValid = false;
//             const input = form.querySelector('[name="' + field + '"]');
//             if (input) {
//                 input.style.borderColor = '#dc2626';
//                 setTimeout(function() {
//                     input.style.borderColor = '';
//                 }, 3000);
//             }
//         }
//     });
    
//     // 验证邮箱格式
//     if (data.user_email && !FoshanFlyUtils.FormValidator.isEmail(data.user_email)) {
//         isValid = false;
//         const emailInput = document.getElementById('user_email');
//         if (emailInput) {
//             emailInput.style.borderColor = '#dc2626';
//             setTimeout(function() {
//                 emailInput.style.borderColor = '';
//             }, 3000);
//         }
//     }
    
//     if (!isValid) {
//         showNotification('请填写所有必填字段');
//         return;
//     }
    
//     // 禁用按钮防止重复提交
//     if (submitBtn) {
//         submitBtn.disabled = true;
//         submitBtn.innerHTML = 'Sending...';
//     }
    
//     // 设置来源
//     data.user_from = "中亿家具";

//     console.log(data);
//      // 1. 初始化 Public Key
//     emailjs.init("zovN2ceDxO5PBgCrk"); 
//     // 调用 emailjs 发送邮件
//     emailjs.send('service_gq4unos', 'template_saszc21', data)
//         .then(function(response) {
//             alert('感谢您的留言，我们将尽快回复！');
//             form.reset();
//             closeSpeakToUsModal();
//         }, function(error) {
//             // alert(error.message);
//             alert('发送失败，请稍后重试或检查网络。');
//         })
//         .finally(function() {
//             if (submitBtn) {
//                 submitBtn.innerHTML = originalText;
//                 submitBtn.disabled = false;
//             }
//         });
// }