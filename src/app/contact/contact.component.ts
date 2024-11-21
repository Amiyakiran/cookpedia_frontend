import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [HeaderComponent , ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
demoMail:string='xyz@gmail.com'

testimonialForm = new FormGroup({
  name : new FormControl(),
  email: new FormControl(),
  message: new FormControl()
})

constructor(private api:ApiService){}


addTesti(){
  console.log(this.testimonialForm.value);

  const {name , email , message} = this.testimonialForm.value

  if(!name || !email || !message){
    alert('Please fill the form')
  }
  else{
    this.api.addTestimonials(this.testimonialForm.value).subscribe({
      next:(result:any)=>{
        console.log(result);
        alert('Added successfully')
        this.testimonialForm.reset()

        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
  
}

}
