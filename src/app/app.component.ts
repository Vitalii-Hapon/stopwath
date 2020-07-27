import {Component} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stopwatch';
  sub: Subscription;
  timeValue = 0;
  time$: Observable<number> = interval(1000);
  timeRunning = false;
  doubleClick = 0;
  isStoped$ = new BehaviorSubject('start');

  constructor() {
  }

  startStop(): void {
    this.startStopwatch();
  }

  wait(): void {
    if (this.timeRunning) {
      if (this.doubleClick === 0) {
        this.doubleClick++;
        setTimeout(() => {
          this.doubleClick = 0;
        }, 300);
      } else {
        this.stop();
        this.doubleClick = 0;
      }
    }
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
}
