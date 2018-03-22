var button = document.createElement('button');
button.innerHTML = 'Click Me';

Rx.Observable.fromEvent(button, 'click')
  .throttleTime(1000)
  .map(event => event.clientX)
  .scan((count, clientX) => count + clientX, 0)
  .subscribe(count => console.log(`${count}`));

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

// var source = Rx.Observable.interval(500);
// var subject = new Rx.Subject();
// var refCounted = source.multicast(subject).refCount();
// var subscription1, subscription2, subscriptionConnect;

// console.log('observerA subscribed');
// subscription1 = refCounted.subscribe({
//   next: (v) => console.log('observerA: ' + v),
// });

// setTimeout(() => {
//   console.log('observerB subscribed');
//   subscription2 = refCounted.subscribe({
//     next: (v) => console.log('observerB: ' + v),
//   }) 
// }, 600);

// setTimeout(() => {
//   console.log('observerA unsubscribed');
//   subscription1.unsubscribe();
// }, 1200);

// setTimeout(() => {
//   console.log('observerB unsubscribed');
//   subscription2.unsubscribe();
// }, 2000);

/**
 * @Subject => BehaviorSubject
 */
// var subject = new Rx.BehaviorSubject(0);

// subject.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });

// subject.next(1);
// subject.next(2);

// subject.subscribe({
//   next: (v) => console.log('ovserverB: ' + v)
// });

// subject.next(3);

/**
 * @Subject => ReplaySubject
 */
// var subject = new Rx.ReplaySubject(3);

// subject.subscribe({
//   next: (v) => console.log('observerA: ' + v)
// });

// subject.next(1);
// subject.next(2);
// subject.next(3);
// subject.next(4);

// subject.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// });

// subject.next(5);

/**
 * @Subject => AsyncSubject
 */
// var subject = new Rx.AsyncSubject();

// subject.subscribe({
//   next: (v) => console.log('ovserverA: ' + v)
// });

// subject.next(1);
// subject.next(2);
// subject.next(3);
// subject.next(4);

// subject.subscribe({
//   next: (v) => console.log('observerB: ' + v)
// });

// subject.next(5);
// subject.complete();

/**
 * Operators : multiplyByTen
 */
// Rx.Observable.prototype.multiplyByTen = function multiplyByTen() {
//   var input = this;
//   return Rx.Observable.create(function subscribe(observer) {
//     input.subscribe({
//       next: (v) => observer.next(10 * v),
//       error: (err) => observer.error(err),
//       complete: () => observer.complete(),
//     });
//   });
// }

// var observable = Rx.Observable.from([1, 2, 3, 4]).multiplyByTen();
// observable.subscribe(x => console.log(x));

/**
 * 静态操作符
 * 是附加到Observable类上的纯函数，
 * 通常用来从头开始创建Observable
 */
/**
 * 例如：interval, create, merge 等
 */

/**
* Scheduler 调度器
* 调度器是一种数据结构。
* 调度器是执行上下文，表示在何时何地执行任务。
* 调度器有一个虚拟的时钟。
* 例如： async 调度器
*/
var observable = Rx.Observable.create(function (proxyObserver) {
  proxyObserver.next(1);
  proxyObserver.next(2);
  proxyObserver.next(3);
  proxyObserver.complete();
})
.observeOn(Rx.Scheduler.async);

var finalObserver = {
  next: x => console.log('got value ' + x),
  error: err => console.error(err),
  complete: () => console.log('done'),
};

console.log('just before subscribe');
observable.subscribe(finalObserver);
console.log('just after subscribe');
