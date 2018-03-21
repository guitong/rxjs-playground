'use strict';

var button = document.createElement('button');
button.innerHTML = 'Click Me';

Rx.Observable.fromEvent(button, 'click').throttleTime(1000).map(function (event) {
  return event.clientX;
}).scan(function (count, clientX) {
  return count + clientX;
}, 0).subscribe(function (count) {
  return console.log('' + count);
});

document.body.appendChild(button);

// var source = Rx.Observable.interval(500);
// var subject = new Rx.Subject();
// var multicasted = source.multicast(subject);
// var subscription1, subscription2, subscriptionConnect;

// subscription1 = multicasted.subscribe({
//   next: (v) => console.log('observerA: ' + v),
// });

// subscriptionConnect = multicasted.connect();

// setTimeout(() => {
//   subscription2 = multicasted.subscribe({
//     next: (v) => console.log('observerB: ', v),
//   });
// }, 600);

// setTimeout(() => {
//   subscription1.unsubscribe();
// }, 1200);

// setTimeout(() => {
//   subscription2.unsubscribe();
//   subscriptionConnect.unsubscribe();
// }, 2000);

var source = Rx.Observable.interval(500);
var subject = new Rx.Subject();
var refCounted = source.multicast(subject).refCount();
var subscription1, subscription2, subscriptionConnect;

console.log('observerA subscribed');
subscription1 = refCounted.subscribe({
  next: function next(v) {
    return console.log('observerA: ' + v);
  }
});

setTimeout(function () {
  console.log('observerB subscribed');
  subscription2 = refCounted.subscribe({
    next: function next(v) {
      return console.log('observerB: ' + v);
    }
  });
}, 600);

setTimeout(function () {
  console.log('observerA unsubscribed');
  subscription1.unsubscribe();
}, 1200);

setTimeout(function () {
  console.log('observerB unsubscribed');
  subscription2.unsubscribe();
}, 2000);