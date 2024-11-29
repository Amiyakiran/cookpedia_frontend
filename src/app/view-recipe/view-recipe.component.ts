import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-view-recipe',
  standalone: true,
  imports: [HeaderComponent, RouterLink,],
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.css'
})
export class ViewRecipeComponent implements OnInit {

  /*  @Input() id:string="" */

  recipeDetails: any = {}
  relatedRecipeDetails:any[]=[]

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {

    /* to way to get dynamic id from path 
    1) activated route method 
    2) using @input decorator
        - call withComponentInputBinding() iside provideRoute function  as 2nd argument inside app.config.ts
        - define dynamic variable of component url inside the component along with @input() */
    this.route.params.subscribe((result: any) => {
      /* console.log(result); */
      const { id } = result
      console.log(id);
      this.getRecipe(id)
    })
    this.relatedRecipes()

    /*  console.log(this.id); */

  }

  getRecipe(id: string) {
    this.api.getArecipeApi(id).subscribe({
      next: (res: any) => {
       
        this.recipeDetails = res
        console.log(this.recipeDetails);
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  relatedRecipes(){
    if(sessionStorage.getItem("token")){
      this.api.getAllRecipesApi().subscribe({
        next:(res:any)=>{
          for(let x of this.recipeDetails.mealType){
            var p =res.filter((item:any)=>item['mealType'].includes(x))
           console.log(this.relatedRecipeDetails);
          }
          this.relatedRecipeDetails = p.slice(0,5)
          
        },
        error:(err:any)=>{
         console.log(err);
         
        }
      })
    }
  }
  addDownloadRecipe(){
    const recipeD={
      name:this.recipeDetails.name ,
      cuisine:this.recipeDetails.cuisine
    }
    this.api.downloadRecipeApi(this.recipeDetails._id,recipeD).subscribe((res:any)=>{
      this.generatepdf()
    })
  }

  generatepdf(){
    const pdf = new jsPDF()
   
    pdf.setFontSize(16)
    pdf.setTextColor("green")
    pdf.text(this.recipeDetails.name ,10 ,10)

    pdf.setFontSize(12)
    pdf.setTextColor("Black")
    pdf.text(`Cuisine : ${this.recipeDetails.cuisine}` ,10 ,20)
    pdf.text(`Serving : ${this.recipeDetails.servings}` ,10 ,25)
    pdf.text(`Mode of Cooking : ${this.recipeDetails.difficulty}` ,10 ,30)
    pdf.text(`Preparation Time : ${this.recipeDetails.prepTimeMinutes}` ,10 ,35)
    pdf.text(`Cooking Time : ${this.recipeDetails.cookTimeMinutes}` ,10 ,40)
    pdf.text(`calories Per Serving : ${this.recipeDetails.caloriesPerServing}` ,10 ,45)

    //ingredients, Instructions
    let head = [["Ingredients" , "Instructions"]]

    let body:any =[]

    body.push([this.recipeDetails.instructions , this.recipeDetails.instructions])

    autoTable(pdf,{head , body,startY:50})
    pdf.output('dataurlnewwindow')
    pdf.save('download.pdf')
  }
  saveRecipe(){
    const {_id ,name , cuisine , image} = this.recipeDetails
    this.api.saveRecipeApi({id:_id ,name , cuisine , image}).subscribe({
      next:(res:any)=>{
        alert('Recipe saved')
      },
      error:(err:any)=>{
        alert(err.error);
        
      }
    })

  }
}
