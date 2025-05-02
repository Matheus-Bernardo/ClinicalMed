import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import { loginUser } from '../../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    private toastr: ToastrService,
    private router: Router
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
        if(typeUser === 1){
          this.router.navigate(['/welcomePatient']);
        }else{
          return;
        }
      })
      .catch((error) => {         
          this.toastr.error(error,'Erro ao fazer login');
      });

  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
  
  
}
