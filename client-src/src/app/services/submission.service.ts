import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { candidate } from "../models/candidate";
import { candidates } from "../models/candidates";

@Injectable({
  providedIn: "root"
})
export class SubmissionService {
  constructor(private httpClient: HttpClient) {}
  baseApiURL = "http://localhost:5000/api";

  addNewCandidate(newCandidate): Observable<candidate> {
    return this.httpClient.post<candidate>(
      this.baseApiURL + "/submissions",
      newCandidate
    );
  }

  getAllCandidates(): Observable<candidates> {
    return this.httpClient.get<candidates>(this.baseApiURL + "/submissions");
  }
}
