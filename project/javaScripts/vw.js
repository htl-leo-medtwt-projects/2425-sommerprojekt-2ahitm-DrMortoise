const bigImage = document.getElementById('bigImage');
    const previewImages = document.getElementById('previewImages').children;
    const images = [
      '../images/VWKäfer/SlideshowImages/VWSlideshowImage01.png',
      '../images/VWKäfer/SlideshowImages/VWSlideshowImage02.png',
      '../images/VWKäfer/SlideshowImages/VWSlideshowImage03.png',
      '../images/VWKäfer/SlideshowImages/VWSlideshowImage04.png',
      '../images/VWKäfer/SlideshowImages/VWSlideshowImage05.png'
    ];
    let currentIndex = 0;

    function updateSlideshow(index) {
      bigImage.src = images[index];
      bigImage.classList.add('stretch-animation');
      setTimeout(() => bigImage.classList.remove('stretch-animation'), 500);

      // Update preview images
      for (let i = 0; i < previewImages.length; i++) {
        const previewIndex = (index + 1 + i) % images.length;
        previewImages[i].src = images[previewIndex];
        previewImages[i].style.transform = `scale(${1 - i * 0.2})`;
        previewImages[i].style.opacity = `${1 - i * 0.3}`;
      }
    }

    document.getElementById('prevButton').addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateSlideshow(currentIndex);
    });

    document.getElementById('nextButton').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateSlideshow(currentIndex);
    });

    // Initialize the slideshow
    updateSlideshow(currentIndex);