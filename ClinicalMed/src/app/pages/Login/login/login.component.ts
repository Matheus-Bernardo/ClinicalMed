import { Component } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { loginUser } from '../../../../Services/auth.service'

@Component({
  selector: 'app-login',
  imports: [ ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
      typeUser: [false]
    })
  }

  onSubmit() {
    const { email, password, typeUser: rawTypeUser } = this.loginForm.value;
  
    const typeUser = rawTypeUser === false ? 1 : 2;
  
    loginUser(email, password, typeUser)
      .then((res) => {
        console.log('Login realizado com sucesso!');
      })
      .catch((error) => {
       console.log('Erro ao fazer login',error);
      });
  }
  

}
