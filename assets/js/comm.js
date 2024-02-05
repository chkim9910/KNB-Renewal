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
    // menu.addClass("active");
    // mNav.addClass("active");
    // body.css({ overflow: "hidden" });

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
  // mNav에 active 클래스가 없을 때만 동작
  $window.on("scroll", _.throttle(hdScroll, 300));
  function hdScroll() {
    if (!mNav.hasClass("active")) {
      // console.log("mNav does not have active class"); // 디버깅용 메시지
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
  // *****goto-top*****
  $gotoTop.on("click", function () {
    gsap.to($window, { scrollTop: 0, duration: 0.8, ease: "power2.inOut" });
  });

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
  // 이미지 주소 배열
  const imageUrls = [
    "images/sub2/perfermance-info/poster-1.jpg",
    "images/sub2/perfermance-info/poster-2.jpg",
    "images/sub2/perfermance-info/poster-3.jpg",
    "images/sub2/perfermance-info/poster-4.jpg",
    "images/sub2/perfermance-info/poster-5.jpg",
    "images/sub2/perfermance-info/poster-6.png",
  ];
  // 이미지 미리로딩 호출
  preloadImages(imageUrls);

  // 이미지 로딩 상태를 확인하는 함수
  function preloadImages(urls, callback) {
    const images = [];
    let loaded = 0;

    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.addEventListener("load", () => {
        loaded++;
        console.log(`Image loaded: ${url}`);
        if (loaded === urls.length) {
          console.log("All images loaded!");
          callback();
        }
      });
      images.push(img);
    });
  }

  // 이미지 로딩 상태를 확인하고 애니메이션 시작
  preloadImages(imageUrls, function () {
    startAnimation();
  });

  // 애니메이션 함수
  function startAnimation() {
    const txtWrap = $(".performance-info .txt-wrap");
    const behindTit = $(".behind-tit");

    gsap.registerPlugin(ScrollTrigger);
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
        // pinSpacing: false,
        start: "bottom bottom",
        // end: "+=30%",
        scrub: 0.5,
        // markers: true,
      },
    });
    const windowWidth = window.innerWidth;
    if (windowWidth >= 768) {
      // poster-wrap 핀 설정
      const sectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: posterWrap,
          pin: posterWrap,
          start: "top top",
          end: "+=700%",
          scrub: 0.5,
          // markers: true,
        },
      });
      // 각각의 poster에 대한 애니메이션
      posters.forEach(function (elem, i) {
        const tlDelay = i * 2;
        const contentTl = gsap.timeline();
        const posterTxt = gsap.utils.toArray(".poster .txt-wrap");
        const posterArr = gsap.utils.toArray(".poster .go-to-link");
        // console.log(elem);
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
    } else {
      // poster-wrap 핀 설정
      const sectionTl = gsap.timeline({
        scrollTrigger: {
          trigger: posterWrap,
          start: "top bottom",
          // end: "+=600%",
          scrub: 0.5,
        },
      });
      // 각각의 poster에 대한 애니메이션
      posters.forEach(function (elem, i) {
        const tlDelay = i * 1;
        const contentTl = gsap.timeline();
        const posterTxt = gsap.utils.toArray(".poster .txt-wrap");
        const posterArr = gsap.utils.toArray(".poster .go-to-link");
        // 각각의 poster에 애니메이션 설정
        contentTl
          .from([posterTxt[i], posterArr[i]], { autoAlpha: 0, y: 100 })
          .to(posterTxt[i], {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            // stagger: 0.2,
          })
          .to(posterArr[i], {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.5,
            // stagger: 0.2,
          });

        // 각 포스터에 대한 애니메이션을 순차적으로 실행되도록 설정
        sectionTl.add(contentTl, tlDelay);
      });
    }

    // *****before-monthly-schedule*****
    const beforeSchedule = $(".before-monthly-schedule");

    const setInitialProperties = () => {
      gsap.set(beforeSchedule, {
        autoAlpha: 0,
      });
    };

    const createTimeline = (start, end) => {
      return gsap
        .timeline({
          scrollTrigger: {
            trigger: beforeSchedule,
            start: start,
            end: end,
            scrub: 0.5,
          },
        })
        .to(beforeSchedule, {
          autoAlpha: 1,
        });
    };

    const animateText = (trigger, end) => {
      const txtElements = gsap.utils.toArray(".highlight-tit");
      txtElements.forEach((text) => {
        gsap.to(text, {
          backgroundSize: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: text,
            start: "top bottom",
            end: end,
            scrub: true,
          },
        });
      });
    };

    const handleWindowWidth = () => {
      if ($window.innerWidth() >= 768) {
        createTimeline("top center", "center center");
        animateText("top bottom", "top 60%");
      } else {
        createTimeline("top bottom", "center center");
        animateText("top bottom", "top 60%");
      }

      setInitialProperties();
    };

    handleWindowWidth();
    $window.on("resize", handleWindowWidth);
    ScrollTrigger.refresh();

    // *****monthly-schedule*****
    const monthlySchedule = $(".monthly-schedule");
    const calendar = $(".calendar");
    // const ms_txtWrap = $(".monthly-schedule .txt-wrap");
    const ms_tit = $(".monthly-schedule .txt-wrap .tit");
    const ms_subtit = $(".monthly-schedule .txt-wrap .sub-tit");
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
        [ms_tit, ms_subtit, ms_behindTit],
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
      // .fromTo(
      //   ms_behindTit,
      //   { x: 100, opacity: 0 },
      //   { x: 0, opacity: 1, duration: 0.6 }
      // )
      .to(calendar, {
        y: 0,
        autoAlpha: 1,
      });

    // *****chronological-list*****
    function throttle(func, limit) {
      let inThrottle;
      return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    }
    function handleResizeThrottled() {
      const chronologicalList = $(".chronological-list");
      const scrollWrap1 = $(".scroll-1");
      const scrollWrap2 = $(".scroll-2");
      const scrollCont1 = $(".scroll-1 .scroll-contents-box");
      const scrollCont2 = $(".scroll-2 .scroll-contents-box");
      const cl_tit = $(".chronological-list .txt-wrap .tit");
      const cl_subtit = $(".chronological-list .txt-wrap .sub-tit");
      // const scrollCont1Tit = $(".scroll-1 .scroll-tit");
      // const scrollCont2Tit = $(".scroll-2 .scroll-tit");
      const scrollCont1TitMob = $(".scroll-1 .scroll-tit-mob");
      const scrollCont2TitMob = $(".scroll-2 .scroll-tit-mob");
      const cl_behindTit = $(".chronological-list .behind-tit");
      if ($window.innerWidth() >= 768) {
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
            onStart: () => console.log("Animation started"),
            onComplete: () => console.log("Animation completed"),
          })

          .fromTo(
            [cl_tit, cl_subtit, cl_behindTit],
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
          )
          // .fromTo(
          //   cl_behindTit,
          //   { x: 100, opacity: 0 },
          //   { x: 0, opacity: 1, duration: 0.6 }
          // )
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
            // markers: true,
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
            // markers: true,
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
      } else {
        gsap.set(calendar, {
          y: 100,
          autoAlpha: 0,
        });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: chronologicalList,
              start: "top bottom",
              end: "center center",
              scrub: 0.5,
            },
          })
          .fromTo(
            [cl_tit, cl_subtit, cl_behindTit],
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 }
          )
          // .fromTo(
          //   cl_behindTit,
          //   { x: 100, opacity: 0 },
          //   { x: 0, opacity: 1, duration: 0.5 }
          // )
          .to(scrollWrap1, {
            y: 0,
            autoAlpha: 1,
            // duration: 1,
            delay: 1,
          });

        gsap.set([scrollCont1, scrollCont2], {
          y: 0,
          autoAlpha: 1,
        });
        const scrollWrap1Tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollWrap1,
            start: "top bottom",
            end: "+=120%",
            scrub: 0.5,
            delay: 1,
          },
        });
        scrollWrap1Tl.fromTo(
          [scrollCont1TitMob, scrollCont1],
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.2,
          }
        );

        const scrollWrap2Tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollWrap2,
            start: "top bottom",
            end: "+=120%",
            scrub: 0.5,
          },
        });
        scrollWrap2Tl.fromTo(
          [scrollCont2TitMob, scrollCont2],
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.2,
          }
        );
      }
    }

    const throttledHandleResize = throttle(handleResizeThrottled, 200); // Adjust the throttling time as needed
    // 초기에 실행
    throttledHandleResize();
    // handleResize();
    ScrollTrigger.refresh();
    // 창 크기가 변경될 때마다 실행
    $window.on("resize", throttledHandleResize);

    // *****more-chronological-list*****
    const moreCl = $(".more-chronological-list");
    const moreClFi = $(".more-chronological-list-file-info");
    gsap
      .timeline({
        scrollTrigger: {
          trigger: moreCl,
          start: "top bottom",
          end: "center center",
          scrub: 0.5,
        },
      })
      .fromTo(
        moreCl,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      );
    gsap
      .timeline({
        scrollTrigger: {
          trigger: moreClFi,
          start: "top bottom",
          end: "center center",
          scrub: 0.5,
        },
      })
      .fromTo(
        moreClFi,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );
    var swiper = new Swiper(".swiper-more-chronological-list", {
      slidesPerView: 2,
      spaceBetween: 30,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        360: {
          slidesPerView: 1,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
        },
      },
    });
  }
});
