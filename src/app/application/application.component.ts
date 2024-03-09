import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import {  Auth, User, user,authState  } from '@angular/fire/auth';
import { Database, onValue, ref, update } from '@angular/fire/database';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [MatInputModule,MatFormFieldModule,FormsModule,MatIconModule,MatButtonModule,RouterModule,RouterOutlet],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent {

  constructor(
    private auth: Auth = inject(Auth),
   
   
    private router: Router
   
  ) {}
  logout() {
    this.auth.signOut();
    this.router.navigate(['/home']);
  }
}
