document.addEventListener('DOMContentLoaded', function () {
    new fullpage('#fullpage', {
        controlArrows: false,
        scrollbar: true,
        onLeave(origin, destination, direction, trigger) {
            const currentSection = origin.item;
            const nextSection = destination.item;

            const animatedOutElements = currentSection.querySelectorAll('.item-group > *');
            const animatedInElements = nextSection.querySelectorAll(`.item-group > *`);

            animatedOutElements.forEach(element => {
                element.classList.add('xyz-out');
                element.classList.remove('xyz-in');
            });

            animatedInElements.forEach(element => {
                element.classList.remove('xyz-out');
                element.classList.add('xyz-in');
            });
        },
    });

    const activeSection = document.querySelector('.section.active');
    const animatedInElements = activeSection.querySelectorAll(`.item-group > *`);

    animatedInElements.forEach(element => {
        element.classList.remove('xyz-out');
        element.classList.add('xyz-in');
    });
});
