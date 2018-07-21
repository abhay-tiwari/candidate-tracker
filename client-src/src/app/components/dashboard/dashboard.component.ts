import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      if (profile.auth == false) {
        this.router.navigate(["/"]);
      } else {
        console.log("authentication done");
      }
    });
  }
}
