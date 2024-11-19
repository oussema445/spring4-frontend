import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  message : string = "login ou mot de passe erronés..";
  erreur: number= 0;

  user = new User();


  constructor(private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  err:number = 0;
  onLoggedin()
{
this.authService.login(this.user).subscribe({
next: (data) => {
let jwToken = data.headers.get('Authorization')!;
this.authService.saveToken(jwToken);
this.router.navigate(['/']);
},
error: (err) => {
  this.err = 1;
if (err.error.errorCause=='disabled')
this.message="Utilisateur désactivé, Veuillez contacter votre Administrateur";
}
});
}
  
  
}
