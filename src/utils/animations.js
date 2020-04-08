import gsap from 'gsap';

export const preventFlashingOnLoad = selector => {
    const table = selector === '.content-table' ? true : false;

    const fromOptions = {
        autoAlpha: 0,
        x: table ? -80 : 0,
    };

    const toOptions = {
        delay: 0.1,
        duration: table ? 0.4 : 0.15,
        autoAlpha: 1,
        x: 0,
        ease: 'power1.out',
    };

    gsap.fromTo(selector, fromOptions, toOptions);
};
