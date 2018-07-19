import { Component, OnInit } from "@angular/core";
import { SubmissionService } from "../../services/submission.service";

@Component({
  selector: "app-view-submissions",
  templateUrl: "./view-submissions.component.html",
  styleUrls: ["./view-submissions.component.css"]
})
export class ViewSubmissionsComponent implements OnInit {
  message: string = "";
  hideMessage: boolean = true;
  candidates: any[] = [];
  constructor(private submission: SubmissionService) {}

  ngOnInit() {
    this.submission.getAllCandidates().subscribe(candidates => {
      if (candidates.done == true) {
        for (let i = 0; i < candidates.submissions.length; i++) {
          this.candidates.push({
            name: candidates.submissions[i].name,
            experience: candidates.submissions[i].experience,
            gender: candidates.submissions[i].gender,
            location: candidates.submissions[i].jobLocation,
            skills: candidates.submissions[i].skills.toString(),
            expectedJoining: candidates.submissions[i].expectedJoining
          });
        }

        console.log(this.candidates);
      } else {
        console.log("there is issue in loading ");
      }
    });
  }
}
