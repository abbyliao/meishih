/* ==========================================
   美事居家長照機構 — 共用JavaScript
   common.js
   
   功能：
   1. 載入共用導覽列
   2. 載入共用頁尾
   3. 自動偵測目前頁面，加上 active 樣式
   4. 手機版漢堡選單開關
   ========================================== */


/* ==================
   1. 載入導覽列
   ================== */
fetch('nav.html')
  .then(function(res) { return res.text(); })
  .then(function(html) {
    /* 把導覽列插入頁面最上方 */
    document.body.insertAdjacentHTML('afterbegin', html);
    /* 載入完成後，偵測目前頁面並加上 active */
    setActiveNav();
  });


/* ==================
   2. 載入頁尾
   ================== */
fetch('footer.html')
  .then(function(res) { return res.text(); })
  .then(function(html) {
    /* 把頁尾插入頁面最下方 */
    document.body.insertAdjacentHTML('beforeend', html);
  });


/* ==================
   3. 自動偵測目前頁面，加上 active 樣式
   ================== */
function setActiveNav() {
  /* 取得目前頁面的檔名 */
  var currentPage = window.location.pathname.split('/').pop();
  
  /* 首頁不加 active */
  if (!currentPage || currentPage === 'index.html') return;
  
  /* 找到對應的連結，加上 active class */
  var links = document.querySelectorAll('.ms-nav-links a, .ms-nav-mobile a');
  links.forEach(function(link) {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('ms-nav-active');
    }
  });
}


/* ==================
   4. 手機版漢堡選單開關
   手機版選單改為懸浮固定，不影響頁面排版
   ================== */
function toggleMenu() {
  var menu = document.getElementById('ms-nav-mobile');
  if (!menu) return;

  if (menu.style.display === 'flex') {
    /* 關閉選單 */
    menu.style.display = 'none';
    menu.style.position = '';
    menu.style.top = '';
    menu.style.left = '';
    menu.style.right = '';
    menu.style.zIndex = '';
    menu.style.boxShadow = '';
  } else {
    /* 開啟選單，懸浮固定在導覽列下方 */
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
