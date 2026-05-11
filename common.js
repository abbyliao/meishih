/* Favicon */
var favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/png';
favicon.href = 'favicon.png';
document.head.appendChild(favicon);
/* ==========================================
   美事居家長照機構 — 共用JavaScript
   common.js
   
   功能：
   1. 載入共用導覽列
   2. 載入共用頁尾
   3. 自動偵測目前頁面，加上 active 樣式
   4. 手機版漢堡選單開關（懸浮固定）
   5. 回頂端按鈕
   6. LINE 懸浮按鈕
   ========================================== */


/* ==================
   1. 載入導覽列
   ================== */
fetch('nav.html')
  .then(function(res) { return res.text(); })
  .then(function(html) {
    document.body.insertAdjacentHTML('afterbegin', html);
    setActiveNav();
  });


/* ==================
   2. 載入頁尾
   ================== */
fetch('footer.html')
  .then(function(res) { return res.text(); })
  .then(function(html) {
    document.body.insertAdjacentHTML('beforeend', html);
  });


/* ==================
   3. 自動偵測目前頁面，加上 active 樣式
   ================== */
function setActiveNav() {
  var currentPage = window.location.pathname.split('/').pop();
  if (!currentPage || currentPage === 'index.html') return;
  var links = document.querySelectorAll('.ms-nav-links a, .ms-nav-mobile a');
  links.forEach(function(link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('ms-nav-active');
    }
  });
}


/* ==================
   4. 手機版漢堡選單開關（懸浮固定）
   ================== */
function toggleMenu() {
  var menu = document.getElementById('ms-nav-mobile');
  if (!menu) return;
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
    menu.style.position = '';
    menu.style.top = '';
    menu.style.left = '';
    menu.style.right = '';
    menu.style.zIndex = '';
    menu.style.boxShadow = '';
  } else {
    var nav = document.querySelector('.ms-nav');
    var navHeight = nav ? nav.offsetHeight : 68;
    menu.style.display = 'flex';
    menu.style.position = 'fixed';
    menu.style.top = navHeight + 'px';
    menu.style.left = '0';
    menu.style.right = '0';
    menu.style.zIndex = '19';
    menu.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
  }
}

/* 點擊選單外部自動關閉 */
document.addEventListener('click', function(e) {
  var menu = document.getElementById('ms-nav-mobile');
  var hamburger = document.querySelector('.ms-nav-hamburger');
  if (!menu || !hamburger) return;
  if (menu.style.display === 'flex' && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    toggleMenu();
  }
});


/* ==================
   5. 回頂端 & LINE 懸浮按鈕
   ================== */
(function() {
  /* 建立懸浮按鈕容器 */
  var style = document.createElement('style');
  style.textContent = '\
    .ms-float-btns { position: fixed; right: 1.5rem; bottom: 2rem; display: flex; flex-direction: column; gap: 10px; z-index: 30; }\
    .ms-float-btn { width: 48px; height: 48px; border-radius: 50%; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 12px rgba(0,0,0,0.15); transition: transform 0.2s, box-shadow 0.2s; }\
    .ms-float-btn:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.2); }\
    .ms-float-btn-line { background: #06C755; color: #fff; text-decoration: none; }\
    .ms-float-btn-top { background: #993556; color: #fff; opacity: 0; pointer-events: none; transition: opacity 0.3s; }\
    .ms-float-btn-top.visible { opacity: 1; pointer-events: auto; }\
    .ms-float-btn svg { width: 22px; height: 22px; }\
  ';
  document.head.appendChild(style);

  /* 建立按鈕HTML */
  var container = document.createElement('div');
  container.className = 'ms-float-btns';
  container.innerHTML = '\
    <button class="ms-float-btn ms-float-btn-top" id="backToTop" onclick="window.scrollTo({top:0,behavior:\'smooth\'})" aria-label="回到頂端">\
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>\
    </button>\
    <a class="ms-float-btn ms-float-btn-line" href="https://line.me/R/ti/p/@022ohomm" target="_blank" aria-label="LINE聯絡我們">\
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>\
    </a>\
  ';
  document.body.appendChild(container);

  /* 滾動超過300px才顯示回頂端按鈕 */
  window.addEventListener('scroll', function() {
    var btn = document.getElementById('backToTop');
    if (!btn) return;
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
})();
