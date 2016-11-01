# fl-booking-js
A simple and beautiful appointment widget. An adaptation of [booking-js](https://github.com/timekit-io/booking-js).

## Use it like

``` html
<x-div class="scheduler"
  data-controller='js/scheduler/scheduler_controller'
  data-api="http://localhost:4000">
</x-div>
```

fl-booking-js depends on x-div which is a Web Component. Check the [browser support](http://caniuse.com/#search=Custom%20Elements)
if you are taking it to production. You may need to use a [polyfill](http://webcomponents.org/polyfills/).

## Installation
**NPM**

```bash
npm install fl-booking-js --save
```

**Download**

Just copy [fl-booking-js](https://github.com/fourlabsldn/fl-booking-js/blob/master/dist/fl-booking.min.js) file, and [its dependency x-div](https://raw.githubusercontent.com/fourlabsldn/x-div/master/js/x-div.js). Done.

