import { Tweenlite, EasePack, CSSPlugin } from "gsap";

import { areClipPathShapesSupported } from '../util/clipPathSupport';

var qs = function (s) {
    return document.querySelector(s);
};

; (function ($, window) {

    const defaults = {
        el: '',
        effect: '',
        duration: 1.2,
        delay: 0,
        onLoad: false,
        easing: 'easeInOutQuart',
        parentStart: true,
        mask: {
            yFactor: 0,
            xFactor: 0,
        },
        slide: {
            opacity: true,
            xDistance: 0,
            yDistance: 0
        }
    };

    window.Flaunt = function (options) {
        this.options = extend(defaults, options);
        this.element = (typeof this.options.el === 'string') ? $(this.options.el) : this.options.el;
        this.lastScrollY = 0;
        this.ticking = false;
        this.isClipPathSupported = areClipPathShapesSupported();
        this.init();
    };

    Flaunt.prototype.init = function () {
        if (this.options.effect === 'mask') {
            this.mask();
        } else if (this.options.effect === 'slide') {
            this.hide();
        }
        this.animate();
    };

    Flaunt.prototype.animate = function () {
        if (this.options.onLoad === true) {
            window.addEventListener("load", () => {
                this.unveil();
            });
        } else {
            this.onScroll();
        }
    }

    Flaunt.prototype.onScroll = function () {
        const el = this.element;
        if (typeof (el) != 'undefined' && el != null) {
            const rect = el.getBoundingClientRect();

            // Detect request animation frame
            var scroll = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                // IE Fallback, you can even fallback to onscroll
                function (callback) { window.setTimeout(callback, 1000 / 60) };
            var lastPosition = -1;

            function loop() {
                // Avoid calculations if not needed
                if (lastPosition == window.pageYOffset) {
                    scroll(loop);
                    return false;
                } else lastPosition = window.pageYOffset;

                //... calculations
                if (((window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0)) + (window.innerHeight / 1.6) > Math.round(rect.top)) {
                    return _.unveil();
                }
                scroll(loop);
            }

            // Call the loop for the first time
            loop();

        }
    };

    Flaunt.prototype.unveil = function () {
        if (this.options.effect === 'mask') {
            this.unMask();
        } else if (this.options.effect === 'slide') {
            this.unHide();
        }
    }

    Flaunt.prototype.mask = function () {
        const el = this.element;

        if (typeof (el) != 'undefined' && el != null) {

            if (!this.isClipPathSupported) {
                const self = this;
                TweenLite.to(el, 0, {
                    delay: self.options.delay,
                    ease: self.options.easing,
                    x: self.options.slide.xDistance,
                    autoAlpha: 0,
                });
            } else {
                // CSS clip-path mask
                el.style.clipPath = `polygon(0% ${this.options.mask.yFactor}%, 0% ${this.options.mask.yFactor}%, 0% 100%, 0% 100%)`
            }
        }
    };


    Flaunt.prototype.unMask = function () {
        const el = this.element;

        if (typeof (el) != 'undefined' && el != null) {
            const self = this;
            if (!this.isClipPathSupported) {
                TweenLite.to(el, this.options.duration, {
                    delay: self.options.delay,
                    ease: self.options.easing,
                    x: 0,
                    autoAlpha: 1,
                });
            } else {
                TweenLite.to(el, this.options.duration, {
                    delay: self.options.delay,
                    ease: self.options.easing,
                    clipPath: `polygon(0% ${this.options.mask.yFactor}%, 100% ${this.options.mask.yFactor}%, 100% 100%, 0% 100%)`,
                });
            }
        }
    };

    Flaunt.prototype.hide = function () {
        const el = this.element;
        if (typeof (el) != 'undefined' && el != null) {
            const xDistance = this.options.slide.xDistance;
            const yDistance = this.options.slide.yDistance;
            let opacityOptions = this.options.slide.opacity == true ? 0 : 1;

            TweenLite.to(el, 0, {
                autoAlpha: opacityOptions,
                x: xDistance,
                y: yDistance
            });
        }
    }

    Flaunt.prototype.unHide = function () {
        const el = this.element;
        if (typeof (el) != 'undefined' && el != null) {
            const self = this;

            TweenLite.to(el, self.options.duration, {
                delay: self.options.delay,
                ease: self.options.easing,
                autoAlpha: 1,
                x: 0,
                y: 0
            });
        }
    }

    var extend = function (defaults, options) {
        var extended = {};
        var prop;
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };


}(qs, window));
