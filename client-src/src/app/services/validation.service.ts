import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ValidationService {
  constructor() {}

  validateCandidate(candidate) {
    if (
      candidate.name == "" ||
      candidate.experience == "" ||
      candidate.jobLocation == "" ||
      candidate.expectedJoining == "" ||
      candidate.gender == "" ||
      candidate.skills.length == 0
    ) {
      return false;
    } else {
      return true;
    }
  }
}
