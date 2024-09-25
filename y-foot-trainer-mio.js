try {
    new Swiper('.benefit__wrapper', {
        slidesPerView: 1,
        speed: 400,
        spaceBetween: 71,
        autoplay: true,
        loop: true,
        centeredSlides: true,
        breakpoints: {
            350: {
                enabled: false,
                slidesPerView: 6,
            },
            768: {
                slidesPerView: 3,
                enabled: true,
            },
            800: {
                slidesPerView: 4,

            },
            1023: {
                slidesPerView: 5,
            },
            1239: {
                slidesPerView: 6,
            },
            1350: {
                slidesPerView: 6,
            },
            1500: {
                slidesPerView: 7,
            },
            1800: {
                slidesPerView: 8,
            }
        }
    });
} catch (err) {
    console.warn(err);
}

try {
    new Swiper('.anywhere', {
        disableOnInteraction: false,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: false,
        autoplay: {
            disableOnInteraction: false,
            delay: 3000,
        },
        effect: "fade",
        fadeEffect: {
            crossFade: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
} catch (err) {
    console.warn(err);
}

try {
    new Swiper('.series', {
        disableOnInteraction: false,
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
            disableOnInteraction: false,
            delay: 2000,
        },
        effect: "fade",
        fadeEffect: {
            crossFade: false,
        },
    });
} catch (err) {
    console.warn(err);
}


const textObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.toggle('visible')
                observer.unobserve(entry.target)
            }
        })
    },
    {
        rootMargin: '-14% 0px',
        threshold: 0.1,
    }
);

let textArray = [
    '.description__japanese-character',
    '.description__title',
    '.description__logo',
    '.description__frame-text',
    '.effect__subtitle',
    '.effect__subtitle-mini',
    '.effect__subtitle-text',
    '.rejuvenation__subtitle',
    '.rejuvenation__subtitle-bold',
    '.rejuvenation__text',
    '.flatypodia__subtitle',
    '.flatypodia__subtitle-red',
    '.flatypodia__text',
    '.flatypodia__footnote',
    '.skin__subtitle',
    '.skin__subtitle-red',
    '.skin__text-bold',
    '.skin__img',
    '.benefit__subtitle',
    '.rejuvenation__subtitle',
    '.benefit__item',
    '.yoga__subtitle',
    '.yoga__subtitle-red',
    '.yoga__text2',
    '.yoga__text',
    '.yoga__img',
    '.platform__subtitle',
    '.platform__title-red',
    '.platform__title',
    '.platform__text',
    '.anywhere__title',
    '.anywhere__text',
    '.series__link',
    '.series__arrow',
    '.series__subtitle-first',
    '.series__subtitle-second',
    '.series__subtitle-mob',
    '.rejuvenation__item',
    '.features__item',
    '.swiper-pagination',
];

textArray.forEach((e) => {
    document.querySelectorAll(e).forEach(text => textObserver.observe(text));
})

class LandingVideo {
    constructor(data) {

        this._class = typeof data === "object" ? data.class : data;
        this._videos = document.querySelectorAll(`.${this._class}`);
    }

    addVideoSource() {
        const _mediaQuery = window.matchMedia("(min-width: 768px)");
        const _mediaQueryTablet = window.matchMedia("(min-width: 1023px)");

        for (let i = 0; i < this._videos.length; i++) {
            let _video = this._videos[i];
            console.log(_video.dataset);
            if (_video.dataset.videoMob && !_mediaQuery.matches) {
                if (_video.dataset.videoMobWebm) {
                    _video.innerHTML = `<source src="${_video.dataset.videoMobWebm}" type='video/webm; codecs="vp8, vorbis"'> <source src="${_video.dataset.videoMob}"> `;
                } else {
                    _video.innerHTML = `<source src="${_video.dataset.videoMob}" type="video/mp4">`;
                }
            }
            else if (_video.dataset.videoTablet && !_mediaQueryTablet.matches) {
                if (_video.dataset.videoTabletWebm) {
                    _video.innerHTML = `<source src="${_video.dataset.videoTabletWebm}" type='video/webm; codecs="vp8, vorbis"'> <source src="${_video.dataset.videoTabletWebm}"> `;
                } else {
                    _video.innerHTML = `<source src="${_video.dataset.videoTablet}" type="video/mp4">`;
                }
            }

            else if (_video.dataset.video && _mediaQuery.matches) {
                if (_video.dataset.videoWebm) {
                    _video.innerHTML = `<source src="${_video.dataset.videoWebm}" type='video/webm; codecs="vp8, vorbis"'> <source src="${_video.dataset.video}"> `;
                } else {
                    _video.innerHTML = `<source src="${_video.dataset.video}" type="video/mp4">`;
                }
            }
        }
    }

    playOnScroll() {
        const _options = {
            root: null,
            rootMargin: `0px 0px 0px 0px`,
            threshold: 0.001,
        };
        const _observer = new IntersectionObserver((entries, obs) => {
            for (let i = 0; i < entries.length; i++) {
                if (entries[i].isIntersecting) {
                    entries[i].target.play();
                } else {
                    entries[i].target.pause();
                }
            }
        }, _options);
        const _observerArr = [];
        for (let i = 0; i < this._videos.length; i++) {
            _observerArr.push(_observer.observe(this._videos[i]));
        }
        return _observerArr;
    }
}
// =====================================================================================================================================>
new LandingVideo("video-on-load").addVideoSource();
new LandingVideo("video-on-load").playOnScroll();