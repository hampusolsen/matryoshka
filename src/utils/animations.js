import gsap from 'gsap';

export const preventFlashingOnLoad = () => {
    gsap.to('body', {
        delay: 0.1,
        duration: 0.15,
        autoAlpha: 1
    });
};
