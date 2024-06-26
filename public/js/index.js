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
        onLeave(origin, destination, direction, trigger) {
            const currentSection = origin.item;
            const nextSection = destination.item;

            const animatedOutElements = currentSection.querySelectorAll('.item-group > *');
            const animatedInElements = nextSection.querySelectorAll(`.item-group > *`);

            animateOutElements(animatedOutElements);

            animateInElements(animatedInElements);

            swipeDownContainer.style.display = 'none';
        },
    });

    function longStarter() {
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

                    navContent.classList.add('nav-content-in');

                    document.body.style.overflow = 'unset';
                }, animateInTime);
            }, 1000);
        }, animateInTime + 1800);
    }

    function shortStarter() {
        const starterImagesContainer = document.querySelector('.starter-images-container');

        starterImagesContainer.style = 'display:none;';

        const navContent = document.querySelector('.nav-content');

        navContent.classList.add('nav-content-in');

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
