import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 homeRecipe:any = []

 constructor(private api:ApiService){}

 ngOnInit(){
  this.getHomeRecipes()
 }

 getHomeRecipes(){
  this.api.getAllRecipesApi().subscribe({
    next:(result:any)=>{
     this.homeRecipe = result.slice(0,6)
     console.log(this.homeRecipe);
     
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
 }
}
