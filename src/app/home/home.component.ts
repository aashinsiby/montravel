import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Database, onValue, ref, set } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatIconModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  signInModalOpen = false;
  signUpModalOpen = false;
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
   loginForm : FormGroup =  new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  
  });

  
  constructor( private router: Router, public auth : Auth,public database: Database) {}
  signIn(formValues: any) {
    if (formValues.email === '') {
      alert('Please enter email');
      return;
    }
  
    if (formValues.password === '') {
      alert('Please enter password');
      return;
    }
  
    if (this.loginForm.get('email')?.hasError('email')) {
      alert('Not a valid email');
      return;
    }
  
    if (this.loginForm.get('password')?.hasError('minlength')) {
      alert('Password must be at least 8 characters long');
      return;
    }
    signInWithEmailAndPassword(this.auth, formValues.email, formValues.password)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;

      const idToken = userCredential.user?.getIdToken();
      if (idToken) {
        // Store the token securely, e.g., in local storage or browser session
        localStorage.setItem('firebaseToken', await idToken);
       
        // Navigate to the protected route or profile page
       
      }
   this.router.navigate(['/app']);
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode);
    
        });
  }




  // signup

  register(formValues: any) {
    if (formValues.email === '') {
      alert('Please enter email');
      return;
    }
  
    if (formValues.password === '') {
      alert('Please enter password');
      return;
    }
  
    if (this.registerForm.get('email')?.hasError('email')) {
      alert('Not a valid email');
      return;
    }
  
    if (this.registerForm.get('password')?.hasError('minlength')) {
      alert('Password must be at least 8 characters long');
      return;
    }
  
    createUserWithEmailAndPassword(this.auth, formValues.email, formValues.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        set(ref(this.database,'users/'+user.uid),{
          email : formValues.email,
        

        })
        alert('signup successful');
       
        
        const starCountRef = ref(this.database,'users/'+user.uid)
          
        return onValue(starCountRef, (snapshot) => {
          const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        
        }, {
          onlyOnce: true
        });
       
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorCode);
      });
  } 
}
