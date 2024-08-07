document.addEventListener('DOMContentLoaded', () => {
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

    const progressBar = document.querySelector('.progress-bar');

    let images = document.images;
    let totalImages = images.length;
    let imagesLoaded = 0;

    const updateProgress = progress => {
        progressBar.style.width = `${progress}%`;

        if (progress === 100) {
            initializeFullPage();
            setTimeout(() => {
                const loadingScreen = document.querySelector('.loading-screen');

                loadingScreen.classList.add('loaded');

                const animatedInElements = loadingScreen.querySelectorAll('.item-group > *');

                animatedInElements.forEach(element => {
                    element.classList.remove('xyz-out');
                    element.classList.add('xyz-in');
                });

                mainApp();
            }, 1000);
        }
    };

    const imageLoaded = () => {
        imagesLoaded++;
        let progress = (imagesLoaded / totalImages) * 100;
        updateProgress(progress);
    };

    for (let i = 0; i < totalImages; i++) {
        let img = new Image();
        img.onload = img.onerror = imageLoaded;
        img.src = images[i].src;
    }

    if (totalImages === 0) {
        updateProgress(100);
    }

    function initializeFullPage() {
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
            navigationTooltips,
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

                if (window.innerWidth > 768) {
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
                }

                const animatedOutElements = currentSlide.querySelectorAll('.item-group > *');
                const animatedInElements = nextSlide.querySelectorAll(`.item-group > *`);

                animateOutElements(animatedOutElements);

                animateInElements(animatedInElements);
            },
        });
    }

    function mainApp() {
        function shortStarter() {
            const starterTexts = document.querySelectorAll('.starter-text');

            starterTexts.forEach(text => {
                const currentValue = text.getAttribute('xyz');

                text.setAttribute('xyz', currentValue + ' out-duration-8');
            });

            // const starterImagesContainer = document.querySelector('.starter-images-container');

            // starterImagesContainer.style = 'display:none;';

            const navContent = document.querySelector('.nav-content');
            const bulletNav = document.querySelector('#fp-nav.fp-right');

            navContent.classList.add('nav-content-in');

            setTimeout(() => {
                bulletNav.style = 'opacity: 1 !important;';
            }, 800);

            const starterLogoContainer = document.querySelector('.starter-logo-container');
            const animatedStarterElements =
                starterLogoContainer.querySelectorAll('.item-group > *');

            animateInElements(animatedStarterElements);
        }

        shortStarter();
    }
});
