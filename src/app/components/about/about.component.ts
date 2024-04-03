import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  public service = [
    {
      title: "FAMOUS FOR OUR COFFEE",
      image: "icon1.png"
    },
    {
      title: "PHONE RESERVATIONS",
      image: "icon2.png"
    },
    {
      title: "OPEN EVERYDAY 08:00 - 01:00",
      image: "icon3.png"
    },
    {
      title: "LOCATED IN CITY CENTER",
      image: "icon4.png"
    }

  ]
}
