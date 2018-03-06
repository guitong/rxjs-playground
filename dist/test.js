'use strict';

var button = document.createElement('button');
button.innerHTML = 'Click Me';

Rx.Observable.fromEvent(button, 'click').throttleTime(1000).scan(function (count) {
  return count + 1;
}, 0).subscribe(function (count) {
  return console.log('Clicked ' + count + ' times.');
});

document.body.appendChild(button);