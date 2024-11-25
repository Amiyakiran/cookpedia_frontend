import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  LoginForm:FormGroup

  constructor(private fb:FormBuilder , private api:ApiService, private router:Router){
    this.LoginForm = fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  Login(){
    if(this.LoginForm.invalid){
      alert('invalid form')
    }else{
      console.log(this.LoginForm.value);
      this.api.loginApi(this.LoginForm.value).subscribe({
        next:(result:any)=>{
          console.log(result);
          sessionStorage.setItem("existingUser", JSON.stringify(result.existingUser))
          sessionStorage.setItem("token",result.token)

          alert(`Login Successfull `)
          this.LoginForm.reset()
         if(result.existingUser.role=='users')
          { 
            this.router.navigateByUrl('/')
          }
          
        },
        error:(err:any)=>{
          console.log(err);
          alert(err.error)
        }
      })
    }
  }
}
