import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: any = ""
  constructor(private router:Router){}
  ngOnInit() {
    if (sessionStorage.getItem("token")) {
      this.username = JSON.parse(sessionStorage.getItem("existingUser") || "").username
      console.log(this.username);


    }
  }


  logout(){
    sessionStorage.clear()
    this.router.navigateByUrl('/')
  }
}
