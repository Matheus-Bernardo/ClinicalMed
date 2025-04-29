import { Component } from '@angular/core';
import { loginUser } from '../../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], 
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
      typeUser: [false],
    });
  }

  onSubmit() {
    const { email, password, typeUser: rawTypeUser } = this.loginForm.value;
    const typeUser = rawTypeUser === false ? 1 : 2;
  
    const response = loginUser(email, password, typeUser)
      .then((res) => {
        
        this.toastr.success('Login realizado com sucesso!');
      })
      .catch((error) => {         
          this.toastr.error(error,'Erro ao fazer login');
      });

  }
  
}
