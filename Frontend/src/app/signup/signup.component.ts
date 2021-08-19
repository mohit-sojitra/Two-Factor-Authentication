import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isRegistered = false;
  imgURL:string = '';
  token = 0;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  register(value: any) {
    this.authService
      .register(value.email, value.password, value.username)
      .subscribe(
        (res:any) => {
          console.log(res);
          this.isRegistered = true
          this.imgURL = res.imgURL;
        },
        (err) => console.log(err)
      );
  }

  validateCode() {
    this.authService.validateCode(this.token).subscribe(
      (res) => alert('Two step verification done'),
      (err) => console.log(err)
    );
  }
}
