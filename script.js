/**
 * ZUBAYER PORTFOLIO - MAIN SCRIPT
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------------------
     1. Initialize AOS
  --------------------------- */

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true
    });
  }

  /* ---------------------------
     2. Vanilla Tilt Effect
  --------------------------- */

  if (typeof VanillaTilt !== "undefined") {
    const tiltElements = document.querySelectorAll(
      ".c-card, .bento-item, .skill-card"
    );

    if (tiltElements.length > 0) {
      VanillaTilt.init(tiltElements, {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2
      });
    }
  }

  /* ---------------------------
     3. Dark Mode Toggle
  --------------------------- */

  const themeBtn = document.getElementById("theme-toggle");
  const bodyEl = document.body;

  if (themeBtn) {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      bodyEl.setAttribute("data-theme", "dark");
      themeBtn.innerHTML = "☀️";
    } else {
      themeBtn.innerHTML = "🌙";
    }

    themeBtn.addEventListener("click", () => {
      const isDark = bodyEl.hasAttribute("data-theme");

      if (isDark) {
        bodyEl.removeAttribute("data-theme");
        themeBtn.innerHTML = "🌙";
        localStorage.setItem("theme", "light");
      } else {
        bodyEl.setAttribute("data-theme", "dark");
        themeBtn.innerHTML = "☀️";
        localStorage.setItem("theme", "dark");
      }

      themeBtn.style.transform = "scale(1.2) rotate(360deg)";

      setTimeout(() => {
        themeBtn.style.transform = "scale(1)";
      }, 300);
    });
  }

  /* ---------------------------
     4. Skills Bar Animation
  --------------------------- */

  const skillBars = document.querySelectorAll(".fill");

  if (skillBars.length > 0) {
    const skillObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;

            bar.style.width = "0";

            setTimeout(() => {
              bar.style.transition =
                "width 1.5s cubic-bezier(0.17,0.67,0.83,0.67)";

              bar.style.width = width;
            }, 100);

            observer.unobserve(bar);
          }
        });
      },
      { threshold: 0.3 }
    );

    skillBars.forEach((bar) => skillObserver.observe(bar));
  }

  /* ---------------------------
     5. Counter Animation
  --------------------------- */

  const counters = document.querySelectorAll(".counter");
  const statsSection = document.querySelector(".stats-container");

  let countersStarted = false;

  const startCounters = () => {
    if (countersStarted) return;

    countersStarted = true;

    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const duration = 2000;

      let startTime = null;

      const updateCounter = (currentTime) => {
        if (!startTime) startTime = currentTime;

        const progress = Math.min((currentTime - startTime) / duration, 1);

        const value = Math.floor(progress * target);

        counter.innerText = value.toLocaleString() + "+";

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startCounters();
        }
      },
      { threshold: 0.5 }
    );

    statsObserver.observe(statsSection);
  }

  /* ---------------------------
     6. Active Navigation Link
  --------------------------- */

  const navLinks = document.querySelectorAll("nav a");
  const sections = document.querySelectorAll("section");

  function updateActiveNav() {
    let currentId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;

      if (window.pageYOffset >= sectionTop - 150) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + currentId) {
        link.classList.add("active");
      }
    });
  }

  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveNav();
        ticking = false;
      });

      ticking = true;
    }
  });

  /* ---------------------------
     7. Portfolio Letter Animation
  --------------------------- */

  const letters = document.querySelectorAll(".letter");

  if (letters.length > 0) {
    letters.forEach((char, index) => {
      const randomRotation = Math.floor(Math.random() * 10) - 5;

      char.style.transform = `rotate(${randomRotation}deg)`;

      char.style.animation = `bounceIn 0.5s ease forwards ${index * 0.1}s`;
    });
  }
});
