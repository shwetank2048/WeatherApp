import { Component , OnInit} from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private http: Http) {
  this.url = 'http://localhost:3000/weather';
  }
  listArr = [];
  private url: string;
  onClickSubmit(value) {
      this.http.get(this.url + `/${value.name}`).subscribe(data => {
        this.listArr = data.json();
      });
    }
  }

