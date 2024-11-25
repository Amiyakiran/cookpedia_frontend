import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: any = ""
  ngOnInit() {
    if (sessionStorage.getItem("token")) {
      this.username = JSON.parse(sessionStorage.getItem("existingUser") || "").username
      console.log(this.username);


    }
  }
}
