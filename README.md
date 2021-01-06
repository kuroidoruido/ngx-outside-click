# ngx-outside-click

Simple Angular module to detect a click outside of one element.

See interactive demo here : https://kuroidoruido.github.io/ngx-outside-click/

## Basic

Import NgxOutsideClickModule then

```html
<div (ngxOutsideClick)="doSomething($event)">
    ...
</div>
```

`$event` will be the ClickEvent.

## Disable the listening

Import NgxOutsideClickModule then

```html
<div (ngxOutsideClick)="doSomething($event)" [ngxOutsideClickEnabled]="false">
    ...
</div>
```

This way you can enable/disable on need (think about performance issue when your app can have a lot of outside click but only some of them are useful at once).
