// SRT website — shared behavior
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const burger = document.querySelector('.burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      links.classList.toggle('open');
      burger.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      links.classList.remove('open');
    }));
  }

  // Active nav link based on current file
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // Simple contact form (no backend — mailto fallback)
  const form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const subject = encodeURIComponent('Yêu cầu tư vấn từ website SRT — ' + name);
      const body = encodeURIComponent(
        `Họ tên: ${name}\nSĐT: ${phone}\nEmail: ${email}\n\nNội dung:\n${message}`
      );
      window.location.href = `mailto:info@srtsolution.com?subject=${subject}&body=${body}`;
    });
  }
});
