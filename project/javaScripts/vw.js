import barba from '@barba/core';

//barba test
barba.init({
    schema: {
      prefix: 'data-custom',
      wrapper: 'wrap'
    },
    transitions: [{
      name: 'opacity-transition',
      leave(data) {
        return gsap.to(data.current.container, {
          opacity: 0
        });
      },
      enter(data) {
        return gsap.from(data.next.container, {
          opacity: 0
        });
      }
    }],
    views: [{
      namespace: 'home',
      beforeEnter() {
        // Menü aktualisieren
        menu.update();
      },
      afterEnter() {
        // Parallax-Effekt aktualisieren
        parallax.refresh();
      }
    }]
  });