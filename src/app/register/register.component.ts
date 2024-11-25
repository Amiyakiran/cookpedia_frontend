import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm:FormGroup

  constructor(private fb:FormBuilder , private api:ApiService, private router:Router){
    this.registerForm = fb.group({
      username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]
    })
  }

  register(){
    if(this.registerForm.invalid){
      alert('invalid form')
    }else{
      console.log(this.registerForm.value);
      this.api.registerApi(this.registerForm.value).subscribe({
        next:(result:any)=>{
          console.log(result);
          alert(`welcome ${result.username} , Please Login to get full access to our recipes `)
          this.registerForm.reset()
          this.router.navigateByUrl('/login')
          
        },
        error:(err:any)=>{
          console.log(err);
          alert(err.error)
        }
      })
    }
  }

}
