# Flaunt

Reveals elements on load/scroll

[Example available here](https://svmuller.github.io/Flaunt/)

### Basic usage

```javascript
new Flaunt({
    el: '<your element>',
    onLoad: true,
    effect: 'mask'
});
```

### Dependency

The animations are powered by GSAP's Tweenlite

### Compatibility

The masking effect is based on CSS clip-path. If not supported, like in IE, it will degrade to a simple slide-in/opacity animation
