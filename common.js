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
  /* 取得目前頁面的檔名（例如 about.html） */
  var currentPage = window.location.pathname.split('/').pop();
  
  /* 如果是首頁（空白或index.html），不加active */
  if (!currentPage || currentPage === 'index.html') return;
  
  /* 找到對應的連結，加上 active class */
  var links = document.querySelectorAll('.ms-nav-links a, .ms-nav-mobile a');
  links.forEach(function(link) {
    var linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('ms-nav-active');
    }
  });
}


/* ==================
   4. 手機版漢堡選單開關
   ================== */
function toggleMenu() {
  var menu = document.getElementById('ms-nav-mobile');
  if (!menu) return;
  /* 切換顯示/隱藏 */
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'flex';
  }
}
