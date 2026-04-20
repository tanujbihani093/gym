/* ======================================================
   APEX GYM — Premium JavaScript
   ====================================================== */

(function () {
  "use strict";

  /* ---------- LOADER ---------- */
  const loader = document.getElementById("loader");
  const ldb = document.getElementById("ldb");
  const ldp = document.getElementById("ldp");
  let progress = 0;

  function runLoader() {
    const interval = setInterval(() => {
      progress += Math.random() * 8 + 2;
      if (progress >= 100) progress = 100;
      ldb.style.width = progress + "%";
      ldp.textContent = Math.floor(progress) + "%";
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.classList.add("done");
          document.body.style.overflow = "";
        }, 400);
      }
    }, 60);
  }

  document.body.style.overflow = "hidden";
  window.addEventListener("load", runLoader);

  /* ---------- CUSTOM CURSOR ---------- */
  const pb = document.getElementById("pb");
  const co = document.getElementById("co");
  let mx = 0, my = 0, cx = 0, cy = 0;

  if (pb && co && window.innerWidth > 768) {
    document.addEventListener("mousemove", (e) => {
      mx = e.clientX;
      my = e.clientY;
      pb.style.left = mx + "px";
      pb.style.top = my + "px";
    });

    (function animCursor() {
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      co.style.left = cx + "px";
      co.style.top = cy + "px";
      requestAnimationFrame(animCursor);
    })();

    // Hover effects on interactive elements
    document.querySelectorAll("a, button, .sc2, .pl, .tc2, .gc").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        pb.style.width = "0px";
        pb.style.height = "0px";
        co.style.width = "56px";
        co.style.height = "56px";
        co.style.borderColor = "rgba(232,34,46,0.8)";
      });
      el.addEventListener("mouseleave", () => {
        pb.style.width = "8px";
        pb.style.height = "8px";
        co.style.width = "36px";
        co.style.height = "36px";
        co.style.borderColor = "rgba(232,34,46,0.5)";
      });
    });
  }

  /* ---------- NAVBAR SCROLL ---------- */
  const nav = document.getElementById("nav");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const st = window.scrollY;
    if (st > 60) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
    lastScroll = st;
  });

  /* ---------- SCROLL PROGRESS BAR ---------- */
  // Create scroll progress bar dynamically
  const scrollBar = document.createElement("div");
  scrollBar.id = "scroll-progress";
  document.body.appendChild(scrollBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollBar.style.width = scrollPercent + "%";
  });

  /* ---------- MOBILE MENU ---------- */
  const hbgBtn = document.getElementById("hbg-btn");
  const mm = document.getElementById("mm");
  const mc = document.getElementById("mc");
  const mlinks = document.querySelectorAll(".mlink");

  if (hbgBtn && mm && mc) {
    hbgBtn.addEventListener("click", () => mm.classList.add("open"));
    mc.addEventListener("click", () => mm.classList.remove("open"));
    mlinks.forEach((link) =>
      link.addEventListener("click", () => mm.classList.remove("open"))
    );
  }

  /* ---------- SMOOTH SCROLL ---------- */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const target = document.querySelector(a.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  /* ---------- SCROLL REVEAL (IntersectionObserver) ---------- */
  const rxEls = document.querySelectorAll(".rx");
  const revealObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("vis");
          revealObs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  rxEls.forEach((el) => revealObs.observe(el));

  /* ---------- COUNTER ANIMATION ---------- */
  const counters = document.querySelectorAll(".cn");
  let counterDone = false;

  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counterDone) {
          counterDone = true;
          counters.forEach((c) => {
            const target = parseInt(c.dataset.target, 10);
            const duration = 2000;
            const start = performance.now();

            function update(now) {
              const elapsed = now - start;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const ease = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(ease * target);

              if (target >= 1000) {
                c.textContent = (current / 1000).toFixed(current >= target ? 0 : 1) + "K+";
                if (current >= target) c.textContent = (target / 1000) + "K+";
              } else {
                c.textContent = current + (target < 100 ? "+" : "+");
              }

              if (progress < 1) {
                requestAnimationFrame(update);
              }
            }
            requestAnimationFrame(update);
          });
          counterObs.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const cs = document.querySelector(".cs");
  if (cs) counterObs.observe(cs);

  /* ---------- HERO PARTICLE CANVAS ---------- */
  const canvas = document.getElementById("hc");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.3 + 0.05;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,34,46,${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

    function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(232,34,46,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      connectParticles();
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  /* ---------- TILT EFFECT ON CARDS ---------- */
  if (window.innerWidth > 768) {
    document.querySelectorAll(".sc2, .pl, .tc2").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ---------- PARALLAX ON HERO ---------- */
  const hero = document.getElementById("hero");
  if (hero && window.innerWidth > 768) {
    window.addEventListener("scroll", () => {
      const st = window.scrollY;
      if (st < window.innerHeight) {
        const hcon = hero.querySelector(".hcon");
        if (hcon) hcon.style.transform = `translateY(${st * 0.15}px)`;
        const hbg2 = hero.querySelector(".hbg2");
        if (hbg2) hbg2.style.transform = `translateY(${st * 0.08}px)`;
      }
    });
  }

  /* ---------- GALLERY STRIP HORIZONTAL SCROLL ---------- */
  const gsEl = document.querySelector(".gsi");
  if (gsEl) {
    let isDown = false, startX, scrollLeft;
    gsEl.style.cursor = "grab";
    gsEl.addEventListener("mousedown", (e) => {
      isDown = true;
      gsEl.style.cursor = "grabbing";
      startX = e.pageX - gsEl.offsetLeft;
      scrollLeft = gsEl.scrollLeft;
    });
    gsEl.addEventListener("mouseleave", () => { isDown = false; gsEl.style.cursor = "grab"; });
    gsEl.addEventListener("mouseup", () => { isDown = false; gsEl.style.cursor = "grab"; });
    gsEl.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - gsEl.offsetLeft;
      gsEl.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
    gsEl.style.overflowX = "auto";
    gsEl.style.scrollbarWidth = "none";
  }

  /* ---------- ACTIVE NAV LINK HIGHLIGHT ---------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nl a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.style.color = "";
      if (link.getAttribute("href") === "#" + current) {
        link.style.color = "var(--red)";
      }
    });
  });

  /* ---------- MAGNETIC BUTTON EFFECT ---------- */
  if (window.innerWidth > 768) {
    document.querySelectorAll(".br, .bg, .nb").forEach((btn) => {
      btn.addEventListener("mousemove", (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ---------- TEXT TYPING EFFECT ON CTA ---------- */
  const fct = document.querySelector(".fct");
  if (fct) {
    const ctaObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fct.style.opacity = "0";
            fct.style.transform = "translateY(30px)";
            fct.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            setTimeout(() => {
              fct.style.opacity = "1";
              fct.style.transform = "translateY(0)";
            }, 100);
            ctaObs.unobserve(fct);
          }
        });
      },
      { threshold: 0.3 }
    );
    ctaObs.observe(fct);
  }

  /* ---------- PRICING CARD GLOW FOLLOW ---------- */
  document.querySelectorAll(".pl").forEach((card) => {
    const glow = card.querySelector(".plglow");
    if (glow) {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glow.style.left = x + "px";
        glow.style.top = y + "px";
        glow.style.opacity = "0.2";
      });
      card.addEventListener("mouseleave", () => {
        glow.style.opacity = card.classList.contains("ft") ? "0.15" : "0";
      });
    }
  });

})();
