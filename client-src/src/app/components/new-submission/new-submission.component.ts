import { Component, OnInit } from "@angular/core";
import { SubmissionService } from "../../services/submission.service";
import { ValidationService } from "../../services/validation.service";
import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notification.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-submission",
  templateUrl: "./new-submission.component.html",
  styleUrls: ["./new-submission.component.css"]
})
export class NewSubmissionComponent implements OnInit {
  locations = ["Bangalore", "Hyderabad", "Pune", "Gurgaon"];
  jobLocation = "";
  name;
  experience;
  expectedJoining;

  message: string = "";
  hideMessage: boolean = true;
  validation: boolean = false;

  skills = [
    { value: "java", selected: false },
    { value: "python", selected: false },
    { value: "javascript", selected: false },
    { value: "angular", selected: false },
    { value: "HTML", selected: false },
    { value: "CSS", selected: false },
    { value: "react", selected: false },
    { value: "spring", selected: false }
  ];

  genders = [
    { value: "male", selected: false },
    { value: "female", selected: false },
    { value: "other", selected: false }
  ];

  constructor(
    private submission: SubmissionService,
    private validationService: ValidationService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}
  ngOnInit() {
    this.hideMessage = true;
    this.authService.getProfile().subscribe(profile => {
      if (profile.auth == false) {
        this.router.navigate(["/"]);
      } else {
        console.log("authentication done");
      }
    });
  }

  skillChange(index) {
    this.skills[index].selected = !this.skills[index].selected;
  }

  genderUpdate(index) {
    for (let i = 0; i < this.genders.length; i++) {
      if (i == index) {
        this.genders[i].selected = true;
      } else {
        this.genders[i].selected = false;
      }
    }
  }

  resetForm() {
    this.name = "";
    this.experience = "";
    this.jobLocation = "";
    this.expectedJoining = "";

    for (let i = 0; i < this.genders.length; i++) {
      this.genders[i].selected = false;
    }

    for (let i = 0; i < this.skills.length; i++) {
      this.skills[i].selected = false;
    }
  }

  submitForm() {
    let gender;
    for (let i = 0; i < this.genders.length; i++) {
      if (this.genders[i].selected == true) {
        gender = this.genders[i].value;
      }
    }

    let selectedskills = new Array();

    for (let i = 0; i < this.skills.length; i++) {
      if (this.skills[i].selected == true) {
        selectedskills.push(this.skills[i].value);
      }
    }

    let newCandidate = {
      name: this.name,
      experience: this.experience,
      jobLocation: this.jobLocation,
      expectedJoining: this.expectedJoining,
      gender: gender,
      skills: selectedskills
    };

    this.validation = this.validationService.validateCandidate(newCandidate);

    if (this.validation == false) {
      this.message = "Please Fill All Fields";
      this.hideMessage = false;
      return;
    } else {
      this.message = "";
      this.hideMessage = true;
    }

    this.submission.addNewCandidate(newCandidate).subscribe(candidateInfo => {
      if (candidateInfo.done == true) {
        this.message = "Candidate Added Successfully";
        this.hideMessage = false;
        this.resetForm();
        for (let i = 0; i < candidateInfo.submission.skills.length; i++) {
          this.sendNotication(candidateInfo.submission.skills[i]);
          // this.submission
          //   .setNotification(candidateInfo.submission.skills[i])
          //   .subscribe(alert => {
          //     if (alert.done == true) {
          //       console.log("notification added");
          //     } else {
          //       console.log("there is an issue in adding alert");
          //     }
          //   });
        }
      } else if (candidateInfo.done == false) {
        this.message = "Failed to add the candidate";
      }
    });
  }

  sendNotication(skill) {
    this.notificationService.getUser(skill).subscribe(users => {
      if (users.done == true) {
        console.log(users);
        for (let i = 0; i < users.users.length; i++) {
          this.submission
            .setNotification(skill, users.users[i].email)
            .subscribe(notifications => {
              console.log(notifications);
            });
        }
      } else {
        console.log("user done false returned");
      }
    });
  }
}
