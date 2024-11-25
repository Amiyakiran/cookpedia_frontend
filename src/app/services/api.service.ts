import { HttpClient } from '@angular/common/http';
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


}
