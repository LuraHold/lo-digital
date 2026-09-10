(function () {
  document.documentElement.classList.add("js");

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(pointer: fine)").matches;

  function endIntro() {
    document.documentElement.classList.remove("await-intro");
    document.documentElement.classList.remove("intro-out");
    try {
      sessionStorage.setItem("lo-intro", "1");
    } catch (e) {}
  }

  if (document.documentElement.classList.contains("await-intro")) {
    if (reduce) {
      endIntro();
    } else {
      window.setTimeout(function () {
        document.documentElement.classList.add("intro-out");
      }, 1600);
      window.setTimeout(endIntro, 2500);
    }
  }

  if (!reduce) {
    var nodes = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      nodes.forEach(function (el) {
        io.observe(el);
      });
    } else {
      nodes.forEach(function (el) {
        el.classList.add("in");
      });
    }
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("in");
    });
  }

  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  document.body.appendChild(bar);

  function onScroll() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var p = max > 0 ? (doc.scrollTop || document.body.scrollTop) / max : 0;
    bar.style.height = p * 100 + "%";
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (fine && !reduce) {
    document.documentElement.classList.add("has-cursor");
    var ring = document.createElement("div");
    ring.className = "cursor";
    var dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(ring);
    document.body.appendChild(dot);

    var x = 0;
    var y = 0;
    var rx = 0;
    var ry = 0;

    window.addEventListener(
      "mousemove",
      function (event) {
        x = event.clientX;
        y = event.clientY;
        dot.style.left = x + "px";
        dot.style.top = y + "px";
      },
      { passive: true }
    );

    function loop() {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    }
    loop();

    document.addEventListener("mouseover", function (event) {
      var hit = event.target.closest("a, button, .brand-plate, .btn, label");
      ring.classList.toggle("on", Boolean(hit));
    });

    document.addEventListener("click", function (event) {
      var pop = document.createElement("span");
      pop.className = "click-pop";
      pop.style.left = event.clientX + "px";
      pop.style.top = event.clientY + "px";
      document.body.appendChild(pop);
      window.setTimeout(function () {
        pop.remove();
      }, 560);
    });
  }

  if (!reduce) {
    document.querySelectorAll('a[href$=".html"], a[href="index.html"]').forEach(function (link) {
      if (link.target === "_blank" || link.hasAttribute("download")) return;
      link.addEventListener("click", function (event) {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        var href = link.getAttribute("href");
        if (!href || href.charAt(0) === "#") return;
        event.preventDefault();
        document.body.classList.add("leaving");
        window.setTimeout(function () {
          window.location.href = href;
        }, 320);
      });
    });
  }

  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    function runCount(el) {
      var end = parseInt(el.getAttribute("data-count"), 10);
      var suffix = el.getAttribute("data-suffix") || "";
      var start = 0;
      var dur = end > 1000 ? 1400 : 900;
      var t0 = null;
      function frame(now) {
        if (!t0) t0 = now;
        var p = Math.min(1, (now - t0) / dur);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(start + (end - start) * eased);
        el.textContent = val + suffix;
        if (p < 1) requestAnimationFrame(frame);
      }
      if (reduce) {
        el.textContent = end + suffix;
      } else {
        requestAnimationFrame(frame);
      }
    }
    if ("IntersectionObserver" in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            runCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) {
        cio.observe(el);
      });
    } else {
      counters.forEach(runCount);
    }
  }

  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var honey = form.querySelector('[name="company_url"]');
    if (honey && honey.value) return;

    var status = document.getElementById("form-status");
    var name = form.querySelector('[name="name"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var subject = form.querySelector('[name="subject"]').value.trim();
    var message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !subject || !message) {
      status.textContent = "Please complete every field before sending.";
      status.classList.add("show");
      return;
    }

    var body = [
      "Name: " + name,
      "Email: " + email,
      "",
      message,
    ].join("\r\n");

    var mailto =
      "mailto:lodigital@support.com?subject=" +
      encodeURIComponent("[LO Digital] " + subject) +
      "&body=" +
      encodeURIComponent(body);

    status.textContent =
      "Your message is ready. Your email application will open so you can send it to lodigital@support.com.";
    status.classList.add("show");
    window.location.href = mailto;
    form.reset();
  });
})();
