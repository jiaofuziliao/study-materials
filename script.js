/* ========== 顶部导航滚动效果 ========== */
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

/* ========== 移动端菜单 ========== */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

/* ========== 滚动出现动画 ========== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ========== 筛选 + 搜索逻辑 ========== */
const cards = Array.from(document.querySelectorAll('.material-card'));
const gradeChips = document.querySelectorAll('#gradeFilters .chip');
const subjectChips = document.querySelectorAll('#subjectFilters .chip');
const searchInput = document.getElementById('searchInput');
const resultCount = document.getElementById('resultCount');
const noResult = document.getElementById('noResult');
let currentGrade = 'all';
let currentSubject = 'all';

function applyFilters() {
  const keyword = searchInput.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const gradeOk = currentGrade === 'all' || card.dataset.grade === currentGrade;
    const subjectOk = currentSubject === 'all' || card.dataset.subject === currentSubject;
    const textOk = !keyword || (card.dataset.keywords + card.textContent).toLowerCase().includes(keyword);
    const show = gradeOk && subjectOk && textOk;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  resultCount.textContent = visible;
  noResult.style.display = visible === 0 ? 'block' : 'none';
  // 让筛选后新出现的卡片重新触发动画
  cards.filter(c => c.style.display !== 'none').forEach(c => c.classList.add('visible'));
}

gradeChips.forEach(chip => chip.addEventListener('click', () => {
  gradeChips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  currentGrade = chip.dataset.grade;
  applyFilters();
}));

subjectChips.forEach(chip => chip.addEventListener('click', () => {
  subjectChips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  currentSubject = chip.dataset.subject;
  applyFilters();
}));

searchInput.addEventListener('input', applyFilters);

document.getElementById('resetBtn').addEventListener('click', () => {
  gradeChips.forEach(c => c.classList.toggle('active', c.dataset.grade === 'all'));
  subjectChips.forEach(c => c.classList.toggle('active', c.dataset.subject === 'all'));
  currentGrade = 'all';
  currentSubject = 'all';
  searchInput.value = '';
  applyFilters();
});

/* ========== 下载按钮 ========== */
const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');
let toastTimer;

document.querySelectorAll('.download-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // 这里默认用「复制提示」演示。上线后请把这里改成真实下载链接：
    // window.location.href = '你的资料链接.pdf';
    const title = btn.dataset.title;
    toastText.textContent = `「${title}」下载链接已复制，可在资料页获取`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
  });
});
