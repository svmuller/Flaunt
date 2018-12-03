import { Tweenlite, EasePack, CSSPlugin } from "gsap";

import { areClipPathShapesSupported } from '../util/clipPathSupport';

var qs = function (s) {
    return document.querySelector(s);
};

; (function ($, window) {

    const defaults = {
        el: '',
        duration: 1.2,
        delay: 0,
        onLoad: false,
        easing: 'easeInOutQuart',
        parentStart: true,
        animation: {
            mask: {
                yOffset: 0,
                xOffset: 0
            },
            translate: {
                x: 0,
                y: 0
            },
            scale: {
                x: 0,
                y: 0
            },
            opacity: 1
        }
    };

    window.Flaunt = function (options) {
        this.options = extend(defaults, options);
        this.element = (typeof this.options.el === 'string') ? document.querySelector(this.options.el) : this.options.el;
        this.lastScrollY = 0;
        this.ticking = false;
        this.isClipPathSupported = areClipPathShapesSupported();
        this.init();
    };

    Flaunt.prototype.init = function () {
        this.startState();
        this.whenToAnimate();
    };

    Flaunt.prototype.whenToAnimate = function () {
        if (this.options.onLoad === true) {
            this.onLoad();
        } else {
            this.onScroll();
        }
    }

    Flaunt.prototype.onLoad = function () {
        window.addEventListener("load", () => {
            this.animate();
        });
    }

    Flaunt.prototype.onScroll = function () {
        const el = this.element;
        const _ = this;
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
                    return _.animate();
                }
                scroll(loop);
            }

            // Call the loop for the first time
            loop();

        }
    };

    Flaunt.prototype.animate = function () {
        const el = this.element;
        if (typeof (el) != 'undefined' && el != null) {
            TweenLite.to(el, this.options.duration, this.getEndEntries());
        }
    }

    Flaunt.prototype.startState = function () {
        const el = this.element;
        if (typeof (el) != 'undefined' && el != null) {
            TweenLite.to(el, 0, this.getStartEntries());
        }
    }

    Flaunt.prototype.getStartEntries = function () {
        const _ = this;
        const entries = Object.entries(_.options.animation);
        let animationArray = [];

        entries.forEach((item) => {
            if (item[0] === 'translate') {

                Object.entries(item[1]).forEach((i) => {
                    let translate = {};
                    if (i[1] !== 0) {
                        // {key: '', value: ''}
                        translate.key = i[0];
                        translate.value = i[1];

                        // {key: value}
                        //translate[i[0]] = i[1];
                        animationArray.push(translate);
                    }
                })
            } else if (item[0] === 'scale') {
                Object.entries(item[1]).forEach((i, index) => {
                    var scale = {};
                    if (i[1] !== 0) {
                        // {key: '', value: ''}
                        scale.key = `scale${i[0].toUpperCase()}`;
                        scale.value = i[1];

                        // {key: value}
                        // scale[`scale${i[0].toUpperCase()}`] = i[1];
                        animationArray.push(scale);
                    }
                })
            } else if (item[0] === 'opacity') {
                var opacity = {};
                opacity.key = `autoAlpha`;
                opacity.value = item[1];
                //opacity['autoAlpha'] = item[1];
                animationArray.push(opacity);
            }
            else if (item[0] === 'mask') {
                var mask = {};
                mask.key = 'clipPath';
                mask.value = `polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)`
                //mask['clipPath'] = `polygon(0 % ${this.options.animation.mask.yOffset} %, 0 % ${this.options.animation.mask.yOffset} %, 0 % 100 %, 0 % 100 %)`;
                animationArray.push(mask);
            }
        });
        const animationObject = arrayToObject(animationArray);
        console.log(animationObject);
        return animationObject;
    }

    Flaunt.prototype.getEndEntries = function () {
        const _ = this;

        // Animation
        const entries = Object.entries(_.options.animation);
        let animationArray = [];


        entries.forEach((item) => {
            if (item[0] === 'translate') {

                Object.entries(item[1]).forEach((i) => {
                    let translate = {};
                    if (i[1] !== 0) {
                        // {key: '', value: ''}
                        translate.key = i[0];
                        translate.value = 0;

                        // {key: value}
                        //translate[i[0]] = i[1];
                        animationArray.push(translate);
                    }
                })
            } else if (item[0] === 'scale') {
                Object.entries(item[1]).forEach((i, index) => {
                    var scale = {};
                    if (i[1] !== 0) {
                        // {key: '', value: ''}
                        scale.key = `scale${i[0].toUpperCase()}`;
                        scale.value = 1;

                        // {key: value}
                        // scale[`scale${i[0].toUpperCase()}`] = i[1];
                        animationArray.push(scale);
                    }
                })
            } else if (item[0] === 'opacity') {
                var opacity = {};
                opacity.key = `autoAlpha`;
                opacity.value = 1;
                //opacity['autoAlpha'] = item[1];
                animationArray.push(opacity);
            }
            else if (item[0] === 'mask') {
                var mask = {};
                mask.key = 'clipPath';
                mask.value = `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`
                animationArray.push(mask);
            }

            // Delay
            if (_.options.delay > 0) {
                let delay = {};
                delay.key = `delay`;
                delay.value = _.options.delay;
                animationArray.push(delay);
            }

            // Easing
            let ease = {};
            ease.key = `ease`;
            ease.value = _.options.easing;
            animationArray.push(ease);

        });


        const animationObject = arrayToObject(animationArray);
        console.log(animationObject);
        return animationObject;
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

    const arrayToObject = (array) =>
        array.reduce((obj, item) => {
            obj[item.key] = item.value
            return obj
        }, {});


}(qs, window));
