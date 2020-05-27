$('img').unveil({
      offset: 200,
      placeholder: '/assets/images/lazy.jpg',
      debug: true
  }).on('loaded.unveil', function () {
      this.style.opacity = 1;
  });