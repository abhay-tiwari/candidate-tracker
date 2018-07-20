import { Component, OnInit } from "@angular/core";
import { SubmissionService } from "../../services/submission.service";

@Component({
  selector: "app-view-notifications",
  templateUrl: "./view-notifications.component.html",
  styleUrls: ["./view-notifications.component.css"]
})
export class ViewNotificationsComponent implements OnInit {
  notifications = [];
  constructor(private submission: SubmissionService) {}

  ngOnInit() {
    this.submission.getNotification().subscribe(alerts => {
      console.log(alerts);

      if (alerts.done == true) {
        for (let i = 0; i < alerts.alert.length; i++) {
          this.notifications.push({
            id: alerts.alert[i]._id,
            skill: alerts.alert[i].skill,
            unread: alerts.alert[i].unread
          });
        }
      } else {
        console.log("unable to add the notification");
      }
    });
  }

  markRead(index) {
    let update = {
      id: this.notifications[index].id,
      skill: this.notifications[index].skill,
      unread: false
    };
    this.submission.updatNotifications(update).subscribe(alert => {
      if (alert.done == true) {
        this.notifications[index].unread = false;
      } else {
        console.log("update failed");
      }
    });
  }
}
