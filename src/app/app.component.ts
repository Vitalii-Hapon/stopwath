import {Component, OnDestroy} from '@angular/core';
import {BehaviorSubject, fromEvent, interval, Observable, Subscription} from 'rxjs';
import {buffer, debounceTime, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'stopwatch';
  sub: Subscription;
  timeValue = 0;
  time$: Observable<number> = interval(1000);
  timeRunning = false;
  doubleClickSub: Subscription;
  isStoped$ = new BehaviorSubject('start');


  constructor() {
  }

  startStop(): void {
    this.startStopwatch();
  }

  wait(): void {
    const btn = document.getElementById('wait');
    const click$ = fromEvent(btn, 'click');
    const buff$ = click$.pipe(debounceTime(300));
    this.doubleClickSub = click$.pipe(
      buffer(buff$),
      map(list => list.length),
      filter(x => x === 2)
    ).subscribe(event => this.stop());
  }

  reset(): void {
    if (this.timeValue !== 0) {
      this.stop();
      this.timeValue = 0;
      this.startStopwatch();
    }
  }

  stop(): void {
    this.timeRunning = false;
    this.sub.unsubscribe();
    this.isStoped$.next('start');
  }

  startStopwatch(): void {
    if (this.timeRunning) {
      this.stop();
    } else {
      this.isStoped$.next('stop');
      this.sub = this.time$.subscribe(value => {
          this.timeValue++;
        }
      );
      this.timeRunning = !this.timeRunning;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.doubleClickSub.unsubscribe();
  }
}
