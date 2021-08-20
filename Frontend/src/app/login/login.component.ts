import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  isLoggedIn = false;
  token: number = 0;
  constructor(private authService: AuthService,private router:Router) {}

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
      (res: any) => {
        alert(res.message);
        this.router.navigateByUrl('home');
      },
      (err) => console.log(err)
    );
  }
}
