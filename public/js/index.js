document.addEventListener('DOMContentLoaded', function () {
    const swipeDownContainer = document.querySelector('.starter-logo-swipe-down-container');

    function animateInElements(elementsArray) {
        elementsArray.forEach(element => {
            element.classList.remove('xyz-out');
            element.classList.add('xyz-in');
        });
    }

    function animateOutElements(elementsArray) {
        elementsArray.forEach(element => {
            element.classList.add('xyz-out');
            element.classList.remove('xyz-in');
        });
    }

    new fullpage('#fullpage', {
        loopBottom: false,
        loopTop: false,
        keyboardScrolling: true,
        scrollingSpeed: 800,
        scrollHorizontally: true,
        autoScrolling: true,
        controlArrows: true,
        controlArrowsHTML: ['<div class="fp-abc"></div>', '<div class="fp-abc"></div>'],
        loopHorizontal: false,
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: [
            'DirtyCoins',
            'Tiền thân',
            'Nhà sáng lập',
            'Hành trình',
            'Đồng hành',
            'Collaborations',
            'Shop',
        ],
        onLeave(origin, destination, direction, trigger) {
            const currentSection = origin.item;
            const nextSection = destination.item;

            const animatedOutElements = currentSection.querySelectorAll('.item-group > *');
            animateOutElements(animatedOutElements);

            const fpSlides = nextSection.querySelector('.fp-slides');

            if (fpSlides) {
                const activeSlide = fpSlides.querySelector('.slide.active');
                const animatedInElements = activeSlide.querySelectorAll(`.item-group > *`);
                const video = activeSlide.querySelector('video');

                animateInElements(animatedInElements);

                if (video) {
                    setTimeout(() => {
                        video.currentTime = 0;
                        video.play();
                    }, 1000);
                }
            } else {
                const animatedInElements = nextSection.querySelectorAll(`.item-group > *`);

                animateInElements(animatedInElements);
            }

            swipeDownContainer.style.display = 'none';
        },
        onSlideLeave(section, origin, destination, direction, trigger) {
            const currentSlide = origin.item;
            const nextSlide = destination.item;

            const videoInCurrentSlide = currentSlide.querySelector('video');
            const videoInNextSlide = nextSlide.querySelector('video');

            if (videoInCurrentSlide) {
                setTimeout(() => {
                    videoInCurrentSlide.pause();
                }, 800);
            }

            if (videoInNextSlide) {
                setTimeout(() => {
                    videoInNextSlide.currentTime = 0;
                    videoInNextSlide.play();
                }, 1000);
            }

            const animatedOutElements = currentSlide.querySelectorAll('.item-group > *');
            const animatedInElements = nextSlide.querySelectorAll(`.item-group > *`);

            animateOutElements(animatedOutElements);

            animateInElements(animatedInElements);
        },
    });

    function longStarter() {
        const starterTexts = document.querySelectorAll('.starter-text');

        starterTexts.forEach(text => {
            const currentValue = text.getAttribute('xyz');

            text.setAttribute('xyz', currentValue + ' out-duration-0');
        });

        localStorage.setItem('hasVisited', 'true');
        document.body.style.overflow = 'hidden';
        const starterImagesContainer = document.querySelector('.starter-images-container');

        const animatedStarterImages = starterImagesContainer.querySelectorAll('.item-group > *');

        animateInElements(animatedStarterImages);

        const animateInTime = 4500;

        setTimeout(() => {
            animateOutElements(animatedStarterImages);

            setTimeout(() => {
                const starterLogoContainer = document.querySelector('.starter-logo-container');
                const animatedStarterElements =
                    starterLogoContainer.querySelectorAll('.item-group > *');

                starterImagesContainer.style = 'display:none;';

                animateInElements(animatedStarterElements);

                const animateInTime = 2000;

                setTimeout(() => {
                    const navContent = document.querySelector('.nav-content');
                    const bulletNav = document.querySelector('#fp-nav.fp-right');

                    navContent.classList.add('nav-content-in');
                    bulletNav.style = 'opacity: 1 !important;';

                    document.body.style.overflow = 'unset';

                    starterTexts.forEach(text => {
                        let currentValue = text.getAttribute('xyz');

                        const regex = new RegExp(`\\bout-duration-0\\b`, 'g');
                        currentValue = currentValue.replace(regex, '').trim();

                        text.setAttribute('xyz', currentValue + ' out-duration-8');
                    });
                }, animateInTime);
            }, 1000);
        }, animateInTime + 1800);
    }

    function shortStarter() {
        const starterTexts = document.querySelectorAll('.starter-text');

        starterTexts.forEach(text => {
            const currentValue = text.getAttribute('xyz');

            text.setAttribute('xyz', currentValue + ' out-duration-8');
        });

        const starterImagesContainer = document.querySelector('.starter-images-container');

        starterImagesContainer.style = 'display:none;';

        const navContent = document.querySelector('.nav-content');
        const bulletNav = document.querySelector('#fp-nav.fp-right');

        navContent.classList.add('nav-content-in');

        setTimeout(() => {
            bulletNav.style = 'opacity: 1 !important;';
        }, 800);

        const starterLogoContainer = document.querySelector('.starter-logo-container');
        const animatedStarterElements = starterLogoContainer.querySelectorAll('.item-group > *');

        animateInElements(animatedStarterElements);
    }

    const hasVisited = localStorage.getItem('hasVisited');

    if (!hasVisited) {
        longStarter();
    } else {
        shortStarter();
    }
});
