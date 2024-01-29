// sub1-----------------------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const sectionWork = document.querySelector(".sec-work");
  const txtGoto = document.querySelector(".txt-goto");

  // txt-goto를 숨김
  txtGoto.style.opacity = "0";
  txtGoto.style.visibility = "hidden";

  document.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const { offsetTop: sectionWorkTop, offsetHeight: sectionWorkHeight } =
      sectionWork;
    const windowHeight = window.innerHeight;

    // txt-goto가 sec-work에 도달하면 나타나게
    if (
      scrollPosition >= sectionWorkTop &&
      scrollPosition <= sectionWorkTop + sectionWorkHeight - windowHeight
    ) {
      txtGoto.style.opacity = "1";
      txtGoto.style.visibility = "visible";
      // txt-goto 화면 중앙에 위치
      txtGoto.style.top = `${(windowHeight - txtGoto.offsetHeight) / 2}px`;
    } else {
      // 스크롤 벗어나면 txt-goto 다시 숨김
      txtGoto.style.opacity = "0";
      txtGoto.style.visibility = "hidden";
    }
  });

  AOS.init({
    duration: 1000,
  });
});

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
  gsap.registerPlugin(ScrollTrigger);

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
      } else {
        gsap.to($header, {
          y: 0,
          duration: 0.3,
        });
      }
    }
  }

  // --------------------sub1, sub2 sidebar--------------------
  const sidebarEls = $(".side-bar .side-bar-li").toArray();
  const sidebarEl = $(".side-bar .side-bar-li");
  sidebarEl.on("click", function () {
    sidebarEls.forEach((el) => $(el).removeClass("active"));
    $(this).addClass("active");
  });

  $(".smoothscroll").on("click", function (e) {
    e.preventDefault();

    var target = this.hash,
      $target = $(target);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        1500,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });
  // --------------------sub2--------------------
  // *****performance-info*****
  gsap.registerPlugin(ScrollTrigger);
  const txtWrap = $(".performance-info .txt-wrap");
  const behindTit = $(".behind-tit");
  gsap
    .timeline({
      scrollTrigger: {
        trigger: txtWrap,
        start: "top 80%",
        end: "center center",
        scrub: 0.5,
      },
    })
    .fromTo(
      txtWrap,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
    .fromTo(
      behindTit,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, delay: 0.5 }
    );

  const posterWrap = $(".poster-wrap");
  const poster = $(".poster");
  const posters = gsap.utils.toArray(".poster");
  const title = $(".tit-page");
  // tit-page 위로 posters 올라올 수 있도록 핀 설정
  const titleTl = gsap.timeline({
    scrollTrigger: {
      trigger: title,
      // pin: title,
      pinSpacing: false,
      start: "bottom bottom",
      // end: "+=30%",
      scrub: 0.5,
      // markers: true,
    },
  });
  // poster-wrap 핀 설정
  const sectionTl = gsap.timeline({
    scrollTrigger: {
      trigger: posterWrap,
      pin: posterWrap,
      start: "top top",
      end: "+=700%",
      scrub: 0.5,
      markers: true,
    },
  });
  // 각각의 poster에 대한 애니메이션
  posters.forEach(function (elem, i) {
    const tlDelay = i * 2;
    const contentTl = gsap.timeline();
    const posterTxt = gsap.utils.toArray(".poster .txt-wrap");
    const posterArr = gsap.utils.toArray(".poster .go-to-link");
    console.log(elem);
    // poster에 인덱스를 부여해 위로 겹칠 수 있도록 설정
    gsap.set(poster, {
      zIndex: (i, target, targets) => i,
    });
    // 각각의 poster에 애니메이션 설정
    contentTl
      .to(elem, { autoAlpha: 1 }, tlDelay)
      .to([posterTxt[i], posterArr[i]], { autoAlpha: 0, y: 100 }, tlDelay)
      // .to(elem, { autoAlpha: 1 })
      .from(elem, {
        yPercent: 100,
        duration: 2,
        ease: "power2.out",
      })
      .to(
        [posterTxt[i], posterArr[i]],
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        tlDelay + 2
      )
      .to(elem, { yPercent: 0, duration: 2 });

    // 각 포스터에 대한 애니메이션을 순차적으로 실행되도록 설정
    sectionTl.add(contentTl, tlDelay);
  });

  // *****before-monthly-schedule*****
  const beforeSchedule = $(".before-monthly-schedule");
  // const beforeScheduleBf = $(".before-monthly-schedule::before");
  gsap.set(beforeSchedule, {
    // xPercent: -100,
    autoAlpha: 0,
  });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: beforeSchedule,
        start: "top center",
        end: "center center",
        scrub: 0.5,
      },
    })
    .to(beforeSchedule, {
      // xPercent: 0,
      autoAlpha: 1,
    });

  const txtElements = gsap.utils.toArray(".highlight-tit");
  txtElements.forEach((text) => {
    gsap.to(text, {
      backgroundSize: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: text,
        start: "top bottom",
        end: "top 60%",
        scrub: true,
        // markers: true,
      },
    });
  });

  // *****monthly-schedule*****
  const monthlySchedule = $(".monthly-schedule");
  const calendar = $(".calendar");
  const ms_txtWrap = $(".monthly-schedule .txt-wrap");
  const ms_behindTit = $(".monthly-schedule .behind-tit");
  gsap.set(calendar, {
    y: 100,
    autoAlpha: 0,
  });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: monthlySchedule,
        start: "top bottom",
        end: "center center",
        scrub: 0.5,
      },
    })
    .fromTo(
      ms_txtWrap,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
    .fromTo(
      behindTit,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6 }
    )
    .to(calendar, {
      y: 0,
      autoAlpha: 1,
    });

  // *****chronological-list*****
  const chronologicalList = $(".chronological-list");
  const scrollWrap1 = $(".scroll-1");
  const scrollWrap2 = $(".scroll-2");
  const scrollCont1 = $(".scroll-1 .scroll-contents-box");
  const scrollCont2 = $(".scroll-2 .scroll-contents-box");
  const cl_txtWrap = $(".chronological-list .txt-wrap");
  const cl_behindTit = $(".chronological-list .behind-tit");
  gsap.set(scrollWrap1, {
    y: 100,
    autoAlpha: 0,
  });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: chronologicalList,
        start: "top 80%",
        end: "center center",
        scrub: 0.5,
      },
    })
    .from(cl_behindTit, {
      x: 100,
      opacity: 0,
    })
    .fromTo(
      cl_txtWrap,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    )
    .to(cl_behindTit, { x: 0, opacity: 1, duration: 0.6, delay: 0.5 })
    .to(scrollWrap1, {
      y: 0,
      autoAlpha: 1,
      duration: 1,
      delay: 1,
    });

  const scrollWrap1Tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollWrap1,
      pin: scrollWrap1,
      // pinSpacing: false,
      start: "top top",
      end: "+=120%",
      scrub: 0.5,
      markers: true,
    },
  });
  scrollWrap1Tl.fromTo(
    scrollCont1,
    {
      yPercent: 50,
      opacity: 1,
    },
    {
      yPercent: -80,
      opacity: 1,
    }
  );

  const scrollWrap2Tl = gsap.timeline({
    scrollTrigger: {
      trigger: scrollWrap2,
      pin: scrollWrap2,
      // pinSpacing: false,
      start: "top top",
      end: "+=120%",
      scrub: 0.5,
      markers: true,
    },
  });
  scrollWrap2Tl.fromTo(
    scrollCont2,
    {
      yPercent: 50,
      opacity: 1,
    },
    {
      yPercent: -80,
      opacity: 1,
    }
  );
  // chronologicalListTl.add(scrollWrap1Tl, "-=0.2");
  // chronologicalListTl.add(scrollWrap2Tl, "-=0.2");

  // *****more-chronological-list*****
  var swiper = new Swiper(".swiper-more-chronological-list", {
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
