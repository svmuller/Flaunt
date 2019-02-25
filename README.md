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

Given ```clip-path``` support, stick to ```overflow: hidden```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

### TODO

Swap offsets to IntersectionObserver for firing events

