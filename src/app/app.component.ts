import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html?version=${new Date().getTime()}',
  styleUrls: ['./app.component.css?version=${new Date().getTime()}']
})
export class AppComponent {
  title = 'app works!';
}
