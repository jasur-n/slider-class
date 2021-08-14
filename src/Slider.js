class Slide {
  constructor(text, color, isActive) {
    this.text = text;
    this.color = color;
    this.isActive = isActive;
  }
  render() {
    const slide = document.createElement("div");
    slide.innerHTML = `<span>${this.text}</span>`;
    slide.className = "slide";
    if (this.isActive) {
      slide.classList.add("active");
    }
    slide.style.backgroundColor = this.color;

    return slide;
  }
}

export class Slider {
  constructor({ delay = 2000, root, width = 500, height = 250, slides }) {
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

    //uncomment a line below render a slider on initialization
    // this.render();
  }

  changeSlide() {
    const slideElements = document.querySelectorAll(".slide");
    slideElements[++this.activeSlideIndex].classList.add("active");

    if (this.activeSlideIndex < slideElements.length - 1) {
      setTimeout(this.changeSlide.bind(this), this.delay);
    }
  }

  render() {
    const renderHook = document.querySelector(this.root);
    const slider = document.createElement("div");
    slider.style.width = `${this.width}px`;
    slider.style.height = `${this.height}px`;
    slider.className = "slider";

    this.slides.forEach((slide, index) => {
      const slideElement = new Slide(slide.text, slide.color, index === 0);
      slider.append(slideElement.render());
      this.activeSlideIndex = 0;
    });

    renderHook.append(slider);
    setTimeout(this.changeSlide.bind(this), this.delay);
  }
}
