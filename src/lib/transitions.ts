import type { TransitionAnimationPair, TransitionDirectionalAnimations } from 'astro';

const pageSlide: TransitionAnimationPair = {
  // Hide the old content instantly; without an animation the old snapshot lingers over the new one.
  old: {
    name: 'page-hide',
    duration: 'var(--duration-fast)',
    fillMode: 'both',
  },
  new: {
    name: 'page-in',
    duration: 'var(--duration-slow)',
    easing: 'var(--ease)',
    fillMode: 'both',
  },
};

export const fadeSlide: TransitionDirectionalAnimations = {
  forwards: pageSlide,
  backwards: pageSlide,
};
