import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 
import { loginUser } from '../../../Services/login.service';
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
  isLoading = false;

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

    this.isLoading = true;

    const { email, password, typeUser: rawTypeUser } = this.loginForm.value;
    const typeUser = rawTypeUser === false ? 1 : 2;
    console.log('DEBUG: rawTypeUser:', rawTypeUser);
    console.log('DEBUG: typeUser:', typeUser);
  
    const response = loginUser(email, password, typeUser)
      .then((res) => {
        
        this.toastr.success('Login realizado com sucesso!');
        if(typeUser === 1){
          this.router.navigate(['/welcomePatient']);
        }else{
          this.router.navigate(['/welcomeDoctor']);
        }
      })
      .catch((error) => {         
        if(error.message === "Dados inválidos."){
          this.toastr.error("senha ou email incorretos!",'Erro ao fazer login');
        }else{
          console.log(error.message)
          this.toastr.error("Tente novamente mais tarde",'Servidor Indisponível');
        }
        this.isLoading = false;
      });

  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
  
  
}
