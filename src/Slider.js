"use strict";
exports.__esModule = true;
exports.Slider = void 0;
var Slide = /** @class */ (function () {
    function Slide(text, color, isActive) {
        this.text = text;
        this.color = color;
        this.isActive = isActive;
    }
    Slide.prototype.render = function () {
        var slide = document.createElement("div");
        slide.innerHTML = "<span>" + this.text + "</span>";
        slide.className = "slide";
        if (this.isActive) {
            slide.classList.add("active");
        }
        slide.style.backgroundColor = this.color;
        return slide;
    };
    return Slide;
}());
var Slider = /** @class */ (function () {
    function Slider(_a) {
        var _b = _a.delay, delay = _b === void 0 ? 2000 : _b, root = _a.root, _c = _a.width, width = _c === void 0 ? 500 : _c, _d = _a.height, height = _d === void 0 ? 250 : _d, slides = _a.slides;
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
    Slider.prototype.changeSlide = function () {
        var slideElements = document.querySelectorAll(".slide");
        var previousSlideIndex = this.activeSlideIndex;
        this.activeSlideIndex = previousSlideIndex + 1;
        slideElements[this.activeSlideIndex].classList.add("active");
        window.addEventListener("blur", function () {
            console.log("blur");
        });
        // Remove an active class from previous slide after swipe effect has finished
        // setTimeout(() => {
        //   slideElements[previousSlideIndex].classList.remove("active");
        // }, 400); //400ms here are equal to 400ms in transition-duration property of .slide class in styles file
        //Change a slide after delay if the active slide is not the last one
        if (this.activeSlideIndex < slideElements.length - 1) {
            this.activeTimer = setTimeout(this.changeSlide.bind(this), this.delay);
        }
    };
    Slider.prototype.pauseSlider = function () {
        clearTimeout(this.activeTimer);
    };
    Slider.prototype.resumeSlider = function () {
        this.activeTimer = setTimeout(this.changeSlide.bind(this), this.delay);
    };
    Slider.prototype.render = function () {
        var _this = this;
        var renderHook = document.querySelector(this.root);
        var slider = document.createElement("div");
        slider.style.width = this.width + "px";
        slider.style.height = this.height + "px";
        slider.className = "slider";
        this.slides.forEach(function (slide, index) {
            var slideElement = new Slide(slide.text, slide.color, index === 0);
            slider.append(slideElement.render());
            _this.activeSlideIndex = 0;
        });
        renderHook.append(slider);
        setTimeout(this.changeSlide.bind(this), this.delay);
    };
    return Slider;
}());
exports.Slider = Slider;
