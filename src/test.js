var button = document.createElement('button');
button.innerHTML = 'Click Me';

Rx.Observable.fromEvent(button, 'click')
  .throttleTime(1000)
  .scan(count => count + 1, 0)
  .subscribe(count => console.log(`Clicked ${count} times.`));

document.body.appendChild(button);