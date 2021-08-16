type SliderOptions = {
  delay: number;
  root: string;
  width: number;
  height: number;
  slides: { color: string; text: string }[];
};

export class Slider {
  delay: number;
  root: string;
  width: number;
  height: number;
  slides: { color: string; text: string }[];
  activeSlideIndex = 0;
  activeTimer;

  constructor({
    delay = 2000,
    root,
    width = 500,
    height = 250,
    slides,
  }: SliderOptions) {
    if (!root) {
      throw new Error("'root' is a required field");
    }
    if (!slides) {
      throw new Error("'slides' is a required field ");
    }
    this.delay = delay;
    this.root = root;
    this.width = width;
    this.height = height;
    this.slides = slides;

    //uncomment a line below to render a slider on initialization
    // this.render();
  }

  changeSlide() {
    const slideElements = document.querySelectorAll(".slide");
    const previousSlideIndex = this.activeSlideIndex;
    this.activeSlideIndex = previousSlideIndex + 1;
    slideElements[this.activeSlideIndex].classList.add("active");

    // Remove an active class from previous slide after swipe effect has finished
    setTimeout(() => {
      slideElements[previousSlideIndex].classList.remove("active");
    }, 1000);

    //Change a slide after delay if the active slide is not the last one
    if (this.activeSlideIndex < slideElements.length - 1) {
      this.activeTimer = setTimeout(this.changeSlide.bind(this), this.delay);
    }
  }

  pauseSlider() {
    clearTimeout(this.activeTimer);
  }

  resumeSlider() {
    this.activeTimer = setTimeout(this.changeSlide.bind(this), this.delay);
  }

  render() {
    const renderHook = document.querySelector(this.root);

    const slider = document.createElement("div");
    slider.style.width = `${this.width}px`;
    slider.style.height = `${this.height}px`;
    slider.className = "slider";

    this.slides.forEach((slide, index) => {
      const slideElement = document.createElement("div");
      slideElement.innerHTML = `<span>${slide.text}</span>`;
      slideElement.className = "slide";
      if (index === 0) {
        slideElement.classList.add("active");
      }
      slideElement.style.backgroundColor = slide.color;
      slider.append(slideElement);
    });

    renderHook.append(slider);

    this.activeTimer = setTimeout(this.changeSlide.bind(this), this.delay);
  }
}
