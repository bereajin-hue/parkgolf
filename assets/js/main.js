(function () {
  "use strict";

  /* ---------------------------------------------------------------
   * 1. Mobile nav toggle
   * ------------------------------------------------------------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    navMenu.querySelectorAll(".nav-link:not(.nav-link--dropdown)").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------------------------------------------------------------
   * 2. GNB "상품" 드롭다운 — 모바일 탭, 데스크탑 호버(CSS)
   * ------------------------------------------------------------- */
  document.querySelectorAll(".nav-item.has-dropdown").forEach(function (item) {
    var trigger = item.querySelector(".nav-link--dropdown");
    if (!trigger) return;
    trigger.addEventListener("click", function (e) {
      if (window.matchMedia("(max-width: 760px)").matches) {
        e.preventDefault();
        item.classList.toggle("is-open");
      }
    });
  });

  /* ---------------------------------------------------------------
   * 3. products.json을 불러와 GNB 드롭다운을 데이터 기반으로 렌더링
   *    (fetch 실패 시 HTML에 이미 있는 정적 항목을 그대로 사용)
   * ------------------------------------------------------------- */
  var dropdownList = document.querySelector("[data-products-dropdown]");
  if (dropdownList) {
    fetch("/products.json")
      .then(function (res) {
        if (!res.ok) throw new Error("products.json fetch failed");
        return res.json();
      })
      .then(function (products) {
        if (!Array.isArray(products) || products.length === 0) return;
        dropdownList.innerHTML = "";
        products.forEach(function (p) {
          var li = document.createElement("li");
          var a = document.createElement("a");
          a.href = p.url;
          a.className = "nav-dropdown-link";
          a.innerHTML =
            '<span>' + p.name + '</span><span class="status">' + (p.status || "") + "</span>";
          li.appendChild(a);
          dropdownList.appendChild(li);
        });
      })
      .catch(function () {
        /* 정적 마크업 유지 */
      });
  }

  /* ---------------------------------------------------------------
   * 4. 히어로 슬라이드쇼
   * ------------------------------------------------------------- */
  var heroSlides = document.querySelectorAll(".hero-slide");
  if (heroSlides.length > 1) {
    var heroIdx = 0;
    setInterval(function () {
      heroSlides[heroIdx].classList.remove("is-active");
      heroIdx = (heroIdx + 1) % heroSlides.length;
      heroSlides[heroIdx].classList.add("is-active");
    }, 5000);
  }

  /* ---------------------------------------------------------------
   * 5. 일정표 아코디언
   * ------------------------------------------------------------- */
  document.querySelectorAll(".day-card").forEach(function (card) {
    var summary = card.querySelector(".day-summary");
    var detail = card.querySelector(".day-detail");
    if (!summary || !detail) return;

    summary.addEventListener("click", function () {
      var isOpen = card.classList.contains("is-open");
      if (isOpen) {
        card.classList.remove("is-open");
        detail.style.maxHeight = null;
      } else {
        card.classList.add("is-open");
        detail.style.maxHeight = detail.scrollHeight + "px";
      }
    });
  });

  /* ---------------------------------------------------------------
   * 6. 방문지 카드 썸네일 전환
   * ------------------------------------------------------------- */
  document.querySelectorAll(".dest-card").forEach(function (card) {
    var images = card.querySelectorAll(".dest-media img");
    var dots = card.querySelectorAll(".dest-thumb-dot");
    if (images.length < 2) return;

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        images.forEach(function (img, j) {
          img.classList.toggle("is-active", i === j);
        });
        dots.forEach(function (d, j) {
          d.classList.toggle("is-active", i === j);
        });
      });
    });

    var autoIdx = 0;
    setInterval(function () {
      autoIdx = (autoIdx + 1) % images.length;
      images.forEach(function (img, j) { img.classList.toggle("is-active", j === autoIdx); });
      dots.forEach(function (d, j) { d.classList.toggle("is-active", j === autoIdx); });
    }, 4500);
  });

  /* ---------------------------------------------------------------
   * 7. 후기 슬라이더 (가로 스크롤 + 버튼)
   * ------------------------------------------------------------- */
  var reviewTrack = document.querySelector(".review-track");
  var prevBtn = document.querySelector("[data-review-prev]");
  var nextBtn = document.querySelector("[data-review-next]");

  if (reviewTrack && prevBtn && nextBtn) {
    var scrollByCard = function (dir) {
      var card = reviewTrack.querySelector(".review-card");
      var gap = 20;
      var amount = card ? card.offsetWidth + gap : 320;
      reviewTrack.scrollBy({ left: dir * amount, behavior: "smooth" });
    };
    prevBtn.addEventListener("click", function () { scrollByCard(-1); });
    nextBtn.addEventListener("click", function () { scrollByCard(1); });
  }
})();
