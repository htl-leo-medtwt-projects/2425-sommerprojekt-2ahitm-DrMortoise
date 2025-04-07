import barba from '@barba/core';
import { gsap } from 'gsap';

document.addEventListener("DOMContentLoaded", function() {
    // Your other JavaScript code for Audi R8 page
});

// Barba.js initialization
barba.init({
    transitions: [{
      name: 'opacity-transition',
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0,
          duration: 1 // Optional: specify duration (in seconds)
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 1 // Optional: specify duration (in seconds)
        });
      }
    }]
});