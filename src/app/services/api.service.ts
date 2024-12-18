import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl:string = 'http://localhost:4000'

  constructor( private http:HttpClient) { }

  //GET ALL RECIPES
  getAllRecipesApi(){
   return this.http.get(`${this.serverUrl}/all-recipes`)
  }
  //add testimony
  addTestimonials(reqBody:any){
    return this.http.post(`${this.serverUrl}/add-testimonal`, reqBody)
  }
  //register
  registerApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/register-user`, reqBody)
  }
  //login
  loginApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/login-user`, reqBody)
  }

  appendToken(){
    
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers} 
  }

  //view recipe
  getArecipeApi(id:string){
    return this.http.get(`${this.serverUrl}/recipe-details/${id}`, this.appendToken())
  }

  //recipe download
  downloadRecipeApi(recipeId:string, recipeDetails:any){
    return this.http.post(`${this.serverUrl}/recipes/${recipeId}/download`,recipeDetails,this.appendToken())
  }

  //API TO SAVE the recipe
  saveRecipeApi(recipeDetails:any){
    return this.http.post(`${this.serverUrl}/save-recipe`,recipeDetails,this.appendToken())
  }

  //api to get saved recipe
  getSaveRecipeApi(){
    return this.http.get(`${this.serverUrl}/get-save-recipe`,this.appendToken())
  }
  //api to remove saved recipe-remove-savedrecipe/:id
  removeSaveRecipeApi(id:any){
    return this.http.delete(`${this.serverUrl}/remove-savedrecipe/${id}`,this.appendToken())
  }
}
