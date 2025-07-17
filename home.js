document.addEventListener('DOMContentLoaded', function () {

  //! text section animation
  var textSection = document.querySelector('.text-section');
  function scrollAppear() {
    
    var textSectionPosition = textSection.getBoundingClientRect().top;
    var screenPosition = window.innerHeight/1.4;

    if (textSectionPosition < screenPosition) {
      textSection.classList.add('text-section-active');
    }
  }
  window.addEventListener('scroll', scrollAppear);


  //! nav bar toggler
  const toggler = document.querySelector('.nav-bar-toggler');
  const collapseMenu = document.querySelector('.nav-bar-collapse');

  if (toggler && collapseMenu) {
    toggler.addEventListener('click', function () {
      collapseMenu.classList.toggle('show');
    });
  }


  //! slide images
  const wrapper = document.querySelector(".mobile-wrapper-img");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  
  // Clone first and last slides
  let slides = document.querySelectorAll(".swiper-slide");
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  
  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  wrapper.appendChild(firstClone);
  wrapper.insertBefore(lastClone, slides[0]);
  
  // Re-select slides after cloning
  slides = document.querySelectorAll(".swiper-slide");
  
  let currentIndex = 1;
  const totalSlides = slides.length;

  function goToSlide(index, animate = true) {
    const slideWidth = slides[0].offsetWidth;
    wrapper.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
    wrapper.style.transform = `translateX(-${index * slideWidth}px)`;
  }

  //Handle loop after fake clone slide
  function handleLooping() {
    if (slides[currentIndex].classList.contains("clone")) {
       wrapper.addEventListener("transitionend", () => {
         wrapper.style.transition = "none";
         if (currentIndex === 0) {
           currentIndex = totalSlides - 2; // jump to real last
        } else if (currentIndex === totalSlides - 1) {
           currentIndex = 1; // jump to real first
       }
       goToSlide(currentIndex, false);
      }, { once: true });
    }
  }

  // Navigation
  function nextSlide() {
    currentIndex++;
    goToSlide(currentIndex);
    handleLooping();
  }

  function prevSlide() {
    currentIndex--;
    goToSlide(currentIndex);
    handleLooping();
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoPlay();
 });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoPlay();
 });

  // AutoPlay
  let autoPlay = setInterval(nextSlide, 6000); 
  function resetAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(nextSlide, 6000);
  }

  // Responsive
  window.addEventListener("resize", () => goToSlide(currentIndex, false));

  // Initial Positioning
  goToSlide(currentIndex, false);
  

  //! button toggle to show and hide contents
  const buttons = document.querySelectorAll('.footer-item-btn');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const card = this.closest('.card');
      const currentCollapse = card.querySelector('.collapse');
      const currentIcon = this.querySelector('.arrow-icon');
      const isCurrentlyShown = currentCollapse.classList.contains('show');
        
      document.querySelectorAll('.collapse').forEach(collapse => collapse.classList.remove('show'));
      document.querySelectorAll('.arrow-icon').forEach(icon => icon.classList.remove('rotated'));
      document.querySelectorAll('.footer-item-btn').forEach(btn => btn.setAttribute('aria-expanded', 'false'));

      if (!isCurrentlyShown) {
         currentCollapse.classList.add('show');
         currentIcon.classList.add('rotated');
         this.setAttribute('aria-expanded', 'true');
      }
    });
  });
});

