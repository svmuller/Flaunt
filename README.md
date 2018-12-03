# Flaunt

Reveals elements on load/scroll

[Example available here](https://svmuller.github.io/Flaunt/)

### Basic usage

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

The animations are powered by GSAP's Tweenlite

### Compatibility

WIP
