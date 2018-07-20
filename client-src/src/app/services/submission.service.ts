import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { candidate } from "../models/candidate";
import { candidates } from "../models/candidates";
import { alert } from "../models/alert";
import { alerts } from "../models/alerts";

@Injectable({
  providedIn: "root"
})
export class SubmissionService {
  constructor(private httpClient: HttpClient) {}
  baseApiURL = "http://localhost:5000/api";
  notifications = [];

  addNewCandidate(newCandidate): Observable<candidate> {
    return this.httpClient.post<candidate>(
      this.baseApiURL + "/submissions",
      newCandidate
    );
  }

  getAllCandidates(): Observable<candidates> {
    return this.httpClient.get<candidates>(this.baseApiURL + "/submissions");
  }

  setNotification(skill): Observable<alert> {
    let newSkill = {
      skill: skill,
      unread: true
    };
    return this.httpClient.post<alert>(this.baseApiURL + "/alerts", newSkill);
  }

  getNotification(): Observable<alerts> {
    return this.httpClient.get<alerts>(this.baseApiURL + "/alerts");
  }

  updatNotifications(update): Observable<alert> {
    return this.httpClient.put<alert>(
      this.baseApiURL + "/alerts/" + update.id,
      update
    );
  }
}
