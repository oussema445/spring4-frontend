import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../model/user.model';
import { AuthService } from '../services/auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Import Router if navigation is needed
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user = new User();
  confirmPassword?: string;
  myForm!: FormGroup;
  public err?: string; // Declare err for error handling
loading: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, // Inject AuthService
    private router: Router ,// Inject Router if needed for navigation
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onRegister() {
    this.authService.registerUser(this.user).subscribe({
      next: (res) => {
        this. authService.setRegistredUser(this.user);
alert("veillez confirmer votre email");
this.router.navigate(["/verifEmail"]);
this.toastr.success('veillez confirmer votre email', 'Confirmation');},


      error: (err: any) => {
        if (err.status === 400) { // Use `===` for comparison
          this.err = err.error.message;
        }
      }
    });
  }
}
