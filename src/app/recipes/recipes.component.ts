import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  allRecipes:any=[]

  constructor(private api:ApiService){}

ngOnInit(): void {
  this.getAllRecipes()
}
getAllRecipes(){
  this.api.getAllRecipesApi().subscribe({
    next:(result:any)=>{
      console.log(result);
      this.allRecipes=result
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}
}
