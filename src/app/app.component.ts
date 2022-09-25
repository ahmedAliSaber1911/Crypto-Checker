import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedcurrency:string ="USD";
  sendCurrency(event:string){
    this.selectedcurrency = event;
  }
}
