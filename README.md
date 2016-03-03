# fl-booking-js
A simple appointment widget. An daptation of [booking-js](https://github.com/timekit-io/booking-js).

## Use it like:

``` html
<x-div class="scheduler"
data-controller='js/scheduler/scheduler_controller'
data-api="http://localhost:4000">
</x-div>
```

## Installation
**Bower**

```
bower install fl-booking-js --save
```

**Download**

Just copy [this](https://github.com/fourlabsldn/fl-booking-js/blob/master/dist/fl-booking.min.js) file, and [this](https://raw.githubusercontent.com/fourlabsldn/x-div/master/js/x-div.js) one as a dependency. Done.


The dependency is a Web Component, so check the [browser support](http://caniuse.com/#search=Custom%20Elements)
if you are taking it to production. You may need to use a [polyfill](http://webcomponents.org/polyfills/).
