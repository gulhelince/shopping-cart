import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder,Validators} from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * 
 * @param form
 */

// function passwordsMatchValidator(form){
//   const password = form.get('password')
//   const confirmPassword = form.get('confirmPassword')

//   if(password.value !== confirmPassword.value){
//     confirmPassword.setErrors({passwordMatch:true})
//   } else {
//     confirmPassword.setErrors(null)
//   }

//   return null
// }


export function passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
  const password = form.get('password');
  const confirmPassword = form.get('confirmPassword');

  // Eğer kontrol objeleri bulunmazsa, hiçbir işlem yapma
  if (!password || !confirmPassword) {
    return null;
  }

  // Şifreler eşleşmiyorsa hata ayarla
  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMatch: true });
  } else {
    // Eğer başka hatalar yoksa, hataları temizle
    confirmPassword.setErrors(null);
  }

  return null;
}


function symbolValidator(control:AbstractControl){
  if(control.hasError('required')) return null;
  if(control.hasError('minlength')) return null;

  if(control.value.indexOf('@') > -1){
    return null
  }else{
    return { symbol:true}
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  registerForm! : FormGroup;

  constructor(private builder:FormBuilder) { }

  ngOnInit(): void {
   this.buildForm()
  }

  buildForm(){
    this.registerForm = this.builder.group({
      name:['',Validators.required],
      email:['',Validators.required,Validators.email],
      username:['',Validators.required],
      password:['',[Validators.required,symbolValidator,Validators.minLength(4)]],
      confirmPassword:''
    },{
      validators:passwordsMatchValidator
    })
  }

  register(){
    console.log(this.registerForm.value)
  }

}
