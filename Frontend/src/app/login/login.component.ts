import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoggedIn = false;
  token: number = 0;
  constructor(private authService: AuthService) {}

  login(value: any) {
    this.authService.login(value.email, value.password).subscribe(
      (res) => {
        this.isLoggedIn = true;
      },
      (err) => console.log(err)
    );
  }

  validateCode() {
    this.authService.validateCode(this.token).subscribe(
      (res:any) => alert(res.message),
      (err) => console.log(err)
    );
  }
}
