import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subject, Subscription} from 'rxjs';
import {buffer, debounceTime, filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'stopwatch';
  sub: Subscription;
  timeValue = 0;
  time$: Observable<number> = interval(1000);
  timeRunning = false;
  doubleClickSub: Subscription;
  isStoped$ = new BehaviorSubject('start');
  Observable = new Subject();

  constructor() {
  }
  ngOnInit(): void {
    const click$ = this.Observable.asObservable();
    const buff$ = click$.pipe(debounceTime(300));
    this.doubleClickSub = click$.pipe(
      buffer(buff$),
      map(list => list.length),
      filter(x => x === 2)
    ).subscribe(event => {this.stop(); console.log('doubbleclick'); });
  }

  startStop(): void {
    this.startStopwatch();
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
