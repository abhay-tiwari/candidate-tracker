import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  navbarCollapsed: boolean = true;
  login: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.isLogin().subscribe(login => {
      this.login = login.login;

      console.log(this.login);
    });
  }

  logoutUser() {
    this.authService.logout();
    this.router.navigate["/login"];
  }
}
