# Flaunt

Reveals elements on load/scroll

[Example available here](https://svmuller.github.io/Flaunt/)

## Basic usage

```javascript
new Flaunt({
    el: '<your element>',
    onLoad: true,
    animation: {
        mask: {},
        translate: {
            x: 32,
        },
        scale: {
          y: 1.5
        }
    }
});
```

### Dependency

[GSAP](https://greensock.com/gsap)

### Compatibility

```clip-path``` is not supported on IE/Edge and Safari - [Can I Use clip-path](https://caniuse.com/#search=clip-path)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

### TODO

Swap offsets to IntersectionObserver for firing events
Remove ```clip-path``` and switch to ```overflow: hidden``` for IE/Edge and Safari support

