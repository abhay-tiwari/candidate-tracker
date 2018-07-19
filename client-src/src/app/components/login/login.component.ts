import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  responseError: string;
  validationError: string;
  hideValidationError: boolean = true;
  hideResponseError: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    if (this.email == undefined || this.password == undefined) {
      this.validationError = "Please Fill All Fields";
      this.hideValidationError = false;
      return;
    }

    let userCredetials = {
      email: this.email,
      password: this.password
    };

    this.hideValidationError = true;

    this.authService.loginUser(userCredetials).subscribe(user => {
      if (user.done == false) {
        this.responseError = user.message;
        this.hideResponseError = false;
      } else if (user.done == true) {
        this.hideResponseError = true;
        this.authService.storeUserInfo(user.token, user.user);
        this.router.navigate(["/dashboard"]);
      }
    });
  }
}
