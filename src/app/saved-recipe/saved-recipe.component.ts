import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HeaderComponent } from "../header/header.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-saved-recipe',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './saved-recipe.component.html',
  styleUrl: './saved-recipe.component.css'
})
export class SavedRecipeComponent implements OnInit {
allRecipes:any[]=[]

constructor(private api:ApiService){}

ngOnInit(): void {
  this.getsavedRecipes()
}
getsavedRecipes(){
  this.api.getSaveRecipeApi().subscribe((res:any)=>{
     this.allRecipes = res 
   console.log(this.allRecipes);
   
  })
}
removeSavedRecipe(id:any){
  this.api.removeSaveRecipeApi(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.getsavedRecipes()
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}
}
