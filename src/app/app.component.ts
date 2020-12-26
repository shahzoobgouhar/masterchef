import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'masterchef';
  feature: string = 'recipes';
  show: boolean = true;
  loadSelectedFeature(event) {
    this.feature = event;
  }
  testStrcutural() {
    this.show = !this.show;
  }
}
