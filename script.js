// DOM 載入完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滾動到錨點
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ 項目點擊展開/收縮效果
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        const question = item.querySelector('h3');
        
        // 初始狀態：答案部分收縮
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease-out';
        item.style.cursor = 'pointer';
        
        // 添加展開指示器
        const indicator = document.createElement('span');
        indicator.innerHTML = ' ▼';
        indicator.style.fontSize = '0.8em';
        indicator.style.transition = 'transform 0.3s ease';
        question.appendChild(indicator);
        
        // 點擊展開/收縮
        item.addEventListener('click', function() {
            const isExpanded = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
            
            if (isExpanded) {
                answer.style.maxHeight = '0';
                indicator.style.transform = 'rotate(0deg)';
                item.style.backgroundColor = '#f8f9fa';
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                indicator.style.transform = 'rotate(180deg)';
                item.style.backgroundColor = '#ffffff';
            }
        });
        
        // hover 效果
        item.addEventListener('mouseenter', function() {
            if (answer.style.maxHeight === '0px' || answer.style.maxHeight === '') {
                item.style.backgroundColor = '#e9ecef';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (answer.style.maxHeight === '0px' || answer.style.maxHeight === '') {
                item.style.backgroundColor = '#f8f9fa';
            }
        });
    });

    // 按鈕點擊效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 創建點擊波紋效果
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (e.offsetX - 5) + 'px';
            ripple.style.top = (e.offsetY - 5) + 'px';
            ripple.style.width = '10px';
            ripple.style.height = '10px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 滾動時的視差效果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        const parallax = scrolled * 0.5;
        
        header.style.transform = `translateY(${parallax}px)`;
    });

    // 載入動畫
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // 複製功能 (模擬應用程式行為)
    function copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function() {
                showToast('已複製到剪貼簿！');
            });
        } else {
            // 舊版瀏覽器的回退方案
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast('已複製到剪貼簿！');
        }
    }

    // 顯示提示訊息
    function showToast(message) {
        const toast = document.createElement('div');
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // 檢查系統資訊 (僅供展示)
    function getSystemInfo() {
        const userAgent = navigator.userAgent;
        let system = '未知系統';
        
        if (userAgent.indexOf('iPhone') > -1) {
            system = 'iPhone';
        } else if (userAgent.indexOf('iPad') > -1) {
            system = 'iPad';
        } else if (userAgent.indexOf('Mac') > -1) {
            system = 'macOS';
        } else if (userAgent.indexOf('Android') > -1) {
            system = 'Android';
        } else if (userAgent.indexOf('Windows') > -1) {
            system = 'Windows';
        }
        
        return system;
    }

    // 在控制台顯示歡迎訊息
    console.log(`
    🔧 吵架翻譯機 - 技術支援
    ========================
    系統資訊: ${getSystemInfo()}
    瀏覽器: ${navigator.userAgent.split(') ')[0]})
    
    如需技術支援，請訪問：
    https://github.com/WaterGGAI/quarrel-translator-support/issues
    `);
});

// 添加 CSS 動畫
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);