import { Component, OnInit } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-configure-notifications",
  templateUrl: "./configure-notifications.component.html",
  styleUrls: ["./configure-notifications.component.css"]
})
export class ConfigureNotificationsComponent implements OnInit {
  doneMessage: string = "";
  hideDone: boolean = true;
  users = ["admin1@test.com", "admin2@test.com", "user1@test.com"];
  skills = [
    "java",
    "python",
    "HTML",
    "CSS",
    "angular",
    "react",
    "spring",
    "javascript"
  ];

  user = "";
  skill = "";

  notifications = [];

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      if (profile.auth == false) {
        this.router.navigate(["/"]);
      } else {
        console.log("authentication done");
      }
    });
    this.getNotifications();
  }

  getNotifications() {
    this.notificationService.getNotification().subscribe(notifications => {
      console.log(notifications);
      this.notifications = [];
      if (notifications.done == true) {
        for (let i = 0; i < notifications.notifications.length; i++) {
          this.notifications.push({
            email: notifications.notifications[i].email,
            skill: notifications.notifications[i].skill
          });
        }
      } else {
        console.log("some error occured");
      }
    });
  }

  addNotification() {
    let newNotification = {
      email: this.user,
      skill: this.skill
    };

    this.notificationService
      .addNotification(newNotification)
      .subscribe(notification => {
        if (notification.done == true) {
          this.doneMessage = "notification configured successfully";
          this.hideDone = false;
          this.user = "";
          this.skill = "";
          this.getNotifications();
        }
      });
  }
}
