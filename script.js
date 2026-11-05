/* Heart To Soul Psychotherapy — shared behaviour
   1. Mobile menu toggle
   2. Header hides on scroll down, returns on scroll up
   3. Fade-in of sections as they enter the viewport
   4. Back-to-top button
*/
(function () {
  "use strict";

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobileMenu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  /* ---------- header show / hide ---------- */
  var header = document.getElementById("header");
  var lastScroll = window.pageYOffset || 0;

  function onScroll() {
    var y = window.pageYOffset || 0;

    if (header) {
      if (y > 50) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }

      if (y < lastScroll || y < 100) {
        header.classList.remove("is-hidden");
      } else if (y > lastScroll && y > 100) {
        header.classList.add("is-hidden");
      }
    }

    if (toTop) {
      toTop.classList.toggle("is-visible", y > 400);
    }

    lastScroll = y;
  }

  /* ---------- back to top ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- scroll reveal ---------- */
  var items = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    items.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* ---------- services tabs (deep-linkable via ?tab=) ---------- */
  var tabs = document.querySelectorAll(".tab");

  if (tabs.length) {
    var panels = document.querySelectorAll(".tabpanel");

    function showTab(name, push) {
      var found = false;

      tabs.forEach(function (tab) {
        var active = tab.getAttribute("data-tab") === name;
        if (active) found = true;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
      });

      if (!found) return;

      panels.forEach(function (panel) {
        var active = panel.id === "panel-" + name;
        panel.classList.toggle("is-active", active);
        if (active) {
          panel.removeAttribute("hidden");
        } else {
          panel.setAttribute("hidden", "");
        }
      });

      if (push && window.history.replaceState) {
        window.history.replaceState(null, "", "?tab=" + name + window.location.hash);
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        showTab(tab.getAttribute("data-tab"), true);
      });
    });

    var requested = new URLSearchParams(window.location.search).get("tab");
    showTab(requested || "individual", false);
  }
})();
