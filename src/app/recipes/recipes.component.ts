import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../services/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [HeaderComponent, SearchPipe ,FormsModule , NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  allRecipes:any=[]
  fullsample:any=[]
  searchkey:string=""
  p: number = 1;

  constructor(private api:ApiService){}

ngOnInit(): void {
  this.getAllRecipes()
}
getAllRecipes(){
  this.api.getAllRecipesApi().subscribe({
    next:(result:any)=>{
      console.log(result);
      this.allRecipes=result
      this.fullsample=result
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}


filterrecipes(recipeType:string, recipeName:string){
      this.allRecipes = this.fullsample.filter((item:any)=>item[recipeType]==recipeName)
    
}

filterMealrecipes(recipeType:string, recipeName:string){
  this.allRecipes = this.fullsample.filter((item:any)=>item[recipeType].includes(recipeName))

}

pageChangeEvent(event: number){
  this.p = event;
  this.getAllRecipes()
}
}
