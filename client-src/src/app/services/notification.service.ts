import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { notification } from "../models/notification";
import { notifications } from "../models/notifications";
import { Observable } from "rxjs";
import { skilluser } from "../models/skilluser";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  baseUrl = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  addNotification(notification): Observable<notification> {
    return this.http.post<notification>(
      this.baseUrl + "/notification",
      notification
    );
  }

  getNotification(): Observable<notifications> {
    return this.http.get<notifications>(this.baseUrl + "/notification");
  }

  getUser(skill): Observable<skilluser> {
    let params = { skill: skill };
    return this.http.get<skilluser>(this.baseUrl + "/notification/user", {
      params: params
    });
  }
}
