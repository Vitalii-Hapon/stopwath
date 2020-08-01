import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subject, Subscription} from 'rxjs';
import {buffer, debounceTime, filter, map, takeUntil} from 'rxjs/operators';

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
  isStoped$ = new BehaviorSubject('start');
  click$ = new Subject();
  ngUnsubscribe = new Subject();

  constructor() {
  }

  ngOnInit(): void {
    this.click$.pipe(
      takeUntil(this.ngUnsubscribe),
      buffer(this.click$.pipe(debounceTime(300))),
      map(list => list.length),
      filter(x => x === 2)
    ).subscribe(() => this.stop());
  }

  startStop(): void {
    this.startStopwatch();
  }

  startStopwatch(): void {
    if (this.timeRunning) {
      this.stop();
      return;
    }

    this.isStoped$.next('stop');
    this.sub = this.time$.subscribe(() => {
        this.timeValue++;
      }
    );
    this.timeRunning = !this.timeRunning;
  }

  stop(): void {
    this.timeRunning = false;
    this.sub.unsubscribe();
    this.isStoped$.next('start');
  }

  reset(): void {
    if (this.timeValue) {
      this.stop();
      this.timeValue = 0;
      this.startStopwatch();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
