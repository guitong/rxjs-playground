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

var observable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  setTimeout(function () {
    observer.next(4);
    observer.complete();
  }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
  next: function next(x) {
    return console.log('got value ' + x);
  },
  error: function error(err) {
    return console.error('error: ' + err);
  },
  complete: function complete() {
    return console.log('done');
  }
});
console.log('just after subscribe');