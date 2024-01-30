// --------------------header--------------------
$(function () {
  const $window = $(window);
  const $header = $("#header");
  // *****depth*****
  const dep1El = $("#header .dep-1-li");
  const dep2Box = $(".dep-2-box");

  dep1El.on("mouseenter", function () {
    dep1El.removeClass("active");
    $(this).addClass("active");
  });
  dep2Box.on("mouseleave", function () {
    dep1El.removeClass("active");
  });

  // *****select-lang*****
  const langIcon = $(".language .icon-inner");
  langIcon.on("mouseenter", function () {
    $(this).addClass("active");
  });
  langIcon.on("mouseleave", function () {
    $(this).removeClass("active");
  });

  // *****m-menu*****
  const menu = $(".m-menu");
  const mNav = $(".m-nav");
  const body = $(".body");
  menu.on("click", function () {
    if (menu.hasClass("active") && mNav.hasClass("active")) {
      menu.removeClass("active");
      mNav.removeClass("active");
      body.css({ overflow: "auto" }); // 원래 상태로 복원하려면 'auto'로 설정
    } else {
      menu.addClass("active");
      mNav.addClass("active");
      body.css({ overflow: "hidden" });
    }

    // 현재 $header의 배경색 확인
    const currentBackgroundColor = $header.css("background-color");
    $header.css({
      backgroundColor:
        currentBackgroundColor === "rgba(0, 0, 0, 0)"
          ? "black"
          : "rgba(0, 0, 0, 0)",
    });
  });

  // *****m-nav*****
  const mdepEl = $(".dep-1-el");
  mdepEl.on("click", function () {
    const parentElement = $(this).parent();
    if (parentElement.hasClass("active")) {
      parentElement.removeClass("active");
    } else {
      mdepEl.parent().removeClass("active");
      parentElement.addClass("active");
    }
  });

  // scroll될 때 애니메이션
  const $gotoTop = $(".goto-top");
  gsap.registerPlugin(ScrollTrigger);
  gsap.set($gotoTop, { x: 300 });
  gsap.set($gotoTop, { x: 300 });
  // mNav에 active 클래스가 없을 때만 동작
  $window.on("scroll", _.throttle(hdScroll, 300));
  function hdScroll() {
    if (!mNav.hasClass("active")) {
      console.log("mNav does not have active class"); // 디버깅용 메시지
      if ($window.scrollTop() >= ($window.width() >= 1280 ? 100 : 60)) {
        gsap.to($header, {
          y: $window.width() >= 1280 ? -100 : -60,
          duration: 0.3,
        });
        gsap.to($gotoTop, {
          x: -10,
          duration: 0.3,
          delay: 0.2,
        });
        gsap.to($gotoTop, {
          x: -10,
          duration: 0.3,
          delay: 0.2,
        });
      } else {
        gsap.to($header, {
          y: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
        gsap.to($gotoTop, {
          x: 300,
          duration: 0.4,
          ease: "power2.inOut",
        });
      }
    }
  }
});

// *****goto-top*****
$gotoTop.on("click", function () {
  gsap.to($window, { scrollTop: 0, duration: 0.8, ease: "power2.inOut" });
});
