/* ============================================================
   Alif Arya Ramadhan — Portfolio logic
   ============================================================ */
(function () {
  "use strict";

  /* ---------- THEME TOGGLE (dark / light) ---------- */
  const THEME_KEY = "alif-theme";
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");

  // Apply stored theme as early as possible
  (function initTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    const prefersLight =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: light)").matches;
    const theme = stored || (prefersLight ? "light" : "dark");
    root.setAttribute("data-theme", theme);
  })();

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const current =
        root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  /* ---------- TYPING EFFECT (hero role) ---------- */
  const typedEl = document.querySelector(".typing-text");
  if (typedEl && window.Typed) {
    new Typed(".typing-text", {
      strings: [
        "Front-End Web Developer",
        "UI/UX Designer",
        "Content Creator",
        "Freelancer",
      ],
      loop: true,
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1400,
      smartBackspace: true,
    });
  }

  /* ---------- DYNAMIC AGE ---------- */
  // Base: 19 years old in 2024 → birth year 2005 (kept dynamic going forward)
  const BIRTH_YEAR = 2005;
  const ageEl = document.getElementById("age");
  if (ageEl) {
    ageEl.textContent = new Date().getFullYear() - BIRTH_YEAR;
  }

  /* ---------- DYNAMIC COPYRIGHT YEAR ---------- */
  const copyEl = document.getElementById("copyright");
  if (copyEl) {
    const year = new Date().getFullYear();
    copyEl.innerHTML =
      "© " +
      year +
      ' <a class="text-reset fw-bold" href="https://alifaryaramadhan.com/" target="_blank" rel="noopener noreferrer">Alif Arya Ramadhan</a> — Crafted with <span class="heart"><i class="fas fa-heart"></i></span> &amp; code.';
  }

  /* ---------- NAVBAR: scrolled state + scroll progress + active link ---------- */
  const navBar = document.querySelector("nav.navbar");
  const progress = document.getElementById("scrollProgress");

  function onScroll() {
    const y = window.scrollY || document.documentElement.scrollTop;

    if (navBar) {
      navBar.classList.toggle("scrolled", y > 40);
    }

    if (progress) {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Active nav link via IntersectionObserver
  const navLinks = Array.from(
    document.querySelectorAll(".navbar-nav .nav-link"),
  );
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute("href");
      return id && id.startsWith("#") ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const id = "#" + entry.target.id;
            navLinks.forEach(function (link) {
              const href = link.getAttribute("href");
              link.classList.toggle("active", href === id);
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  /* ---------- ANIMATED COUNTERS (stats strip) ---------- */
  const counters = document.querySelectorAll(".stats-strip .num[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    const run = function (el) {
      const target = parseInt(el.getAttribute("data-count"), 10) || 0;
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(eased * target) + (target >= 5 ? "+" : "");
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    };
    const obs = new IntersectionObserver(
      function (entries, o) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            run(e.target);
            o.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 },
    );
    counters.forEach(function (c) {
      obs.observe(c);
    });
  }

  /* ---------- AUTO-CLOSE MOBILE NAV ON LINK CLICK ---------- */
  document
    .querySelectorAll(".navbar-nav .nav-link, .nav-cta")
    .forEach(function (link) {
      link.addEventListener("click", function () {
        const collapse = document.getElementById("navbarNav");
        if (collapse && collapse.classList.contains("show")) {
          // Bootstrap collapse instance
          if (window.bootstrap && bootstrap.Collapse) {
            bootstrap.Collapse.getOrCreateInstance(collapse).hide();
          }
        }
      });
    });

  /* ---------- ANIMATE ON SCROLL ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }

  /* ---------- FETCH + RENDER DATA (certifications & projects) ---------- */
  async function fetchData(type) {
    const url =
      type === "certification"
        ? "certification/certification.json"
        : "project/project.json";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to load " + url);
    return res.json();
  }

  function renderCertifications(list) {
    const container = document.querySelector(".certification .content");
    if (!container) return;
    if (!list.length) {
      container.innerHTML =
        '<p style="color:var(--text-muted)">Certifications coming soon.</p>';
      return;
    }
    container.innerHTML = list
      .map(function (c) {
        return (
          '<div class="box" data-aos="zoom-in" data-aos-duration="700">' +
          '<div class="img-wrap"><img draggable="false" src="' +
          c.image +
          '" alt="' +
          escapeHtml(c.name) +
          '"/></div>' +
          '<div class="desc">' +
          "<h3>" +
          escapeHtml(c.name) +
          "</h3>" +
          "<p>By <span>" +
          escapeHtml(c.by) +
          "</span></p>" +
          '<div class="credentials">' +
          '<a class="btn" target="_blank" rel="noopener noreferrer" href="' +
          (c.links && c.links.credentials ? c.links.credentials : "#") +
          '">View credential <i class="fas fa-angle-right"></i></a>' +
          "</div>" +
          "</div>" +
          "</div>"
        );
      })
      .join("");
    if (window.AOS) AOS.refreshHard();
  }

  function renderProjects(list) {
    const container = document.querySelector(".project .content");
    if (!container) return;
    if (!list.length) {
      container.innerHTML =
        '<p style="color:var(--text-muted)">Projects coming soon.</p>';
      return;
    }
    container.innerHTML = list
      .map(function (p) {
        const demo = p.links && p.links.demo ? p.links.demo : "#";
        const code = p.links && p.links.code ? p.links.code : "#";
        return (
          '<div class="cards" data-aos="fade-up">' +
          '<img draggable="false" src="' +
          p.image +
          '" alt="' +
          escapeHtml(p.title) +
          '"/>' +
          '<div class="desc-content">' +
          '<div class="tag"><h3>' +
          escapeHtml(p.title) +
          "</h3><h5>" +
          escapeHtml(p.tech) +
          "</h5></div>" +
          '<div class="desc"><p>' +
          escapeHtml(p.desc) +
          '</p><div class="btns">' +
          '<a href="' +
          demo +
          '" class="btn" target="_blank" rel="noopener noreferrer"><i class="fas fa-eye"></i> Demo</a>' +
          '<a href="' +
          code +
          '" class="btn" target="_blank" rel="noopener noreferrer"><i class="fas fa-code"></i> Code</a>' +
          "</div></div>" +
          "</div></div>"
        );
      })
      .join("");
    if (window.AOS) AOS.refreshHard();
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Load data with graceful error handling
  fetchData("certification")
    .then(renderCertifications)
    .catch(function (err) {
      console.warn("Certifications failed to load:", err.message);
    });

  fetchData("project")
    .then(renderProjects)
    .catch(function (err) {
      console.warn("Projects failed to load:", err.message);
    });

  /* ---------- LOAD MORE (optional, only if button exists) ---------- */
  const loadmore = document.querySelector(".loadmore-btn");
  if (loadmore) {
    let currentItems = 3;
    loadmore.addEventListener("click", function () {
      const items = Array.prototype.slice.call(
        document.querySelectorAll(".certification .content .box"),
      );
      for (let i = currentItems; i < currentItems + 3; i++) {
        if (items[i]) items[i].classList.add("d-block");
      }
      currentItems += 3;
      if (currentItems >= items.length) {
        loadmore.classList.add("hide");
      }
    });
  }
})();
