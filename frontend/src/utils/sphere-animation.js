import { animate, createScope, createSpring, createDraggable, createTimeline } from 'animejs';

export const initSphereAnimation = () => {
  function fitElementToParent(el, padding) {
    let timeout = null;
    function resize() {
      if (timeout) clearTimeout(timeout);
      anime.set(el, { scale: 1 });
      const pad = padding || 0;
      const parentEl = el.parentNode;
      const elOffsetWidth = el.offsetWidth - pad;
      const parentOffsetWidth = parentEl.offsetWidth;
      const ratio = parentOffsetWidth / elOffsetWidth;
      timeout = setTimeout(() => set(el, { scale: ratio }), 10);
    }
    resize();
    window.addEventListener('resize', resize);
  }

  const sphereEl = document.querySelector('.sphere-animation');
  if (!sphereEl) return; // Prevent crash if element not found

  const spherePathEls = sphereEl.querySelectorAll('.sphere path');
  const pathLength = spherePathEls.length;
  const animations = [];

  fitElementToParent(sphereEl);

  const breathAnimation = anime({
    begin: function () {
      for (let i = 0; i < pathLength; i++) {
        animations.push(
          anime({
            targets: spherePathEls[i],
            stroke: {
              value: ['rgba(255,75,75,1)', 'rgba(80,80,80,.35)'],
              duration: 500,
            },
            translateX: [2, -4],
            translateY: [2, -4],
            easing: 'easeOutQuad',
            autoplay: false,
          })
        );
      }
    },
    update: function (ins) {
      animations.forEach((animation, i) => {
        const percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: false,
  });

  const introAnimation = createTimeline({autoplay: false})
    .add(
      {
        targets: spherePathEls,
        strokeDashoffset: {
          value: [anime.setDashoffset, 0],
          duration: 3900,
          easing: 'easeInOutCirc',
          delay: anime.stagger(190, { direction: 'reverse' }),
        },
        duration: 2000,
        delay: anime.stagger(60, { direction: 'reverse' }),
        easing: 'linear',
      },
      0
    );

  const shadowAnimation = anime({
    targets: '#sphereGradient',
    x1: '25%',
    x2: '25%',
    y1: '0%',
    y2: '75%',
    duration: 30000,
    easing: 'easeOutQuint',
    autoplay: false,
  });

  function init() {
    introAnimation.play();
    breathAnimation.play();
    shadowAnimation.play();
  }

  init();
};
