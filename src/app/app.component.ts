import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stopwatch';

  // time: number;
  time = 7470;

  startStop(): void {
    console.log('start');
  }

  wait(): void {
    console.log('wait');
  }

  reset(): void {
    console.log('reset');
  }
}
