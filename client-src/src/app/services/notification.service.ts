import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { notification } from "../models/notification";
import { notifications } from "../models/notifications";
import { Observable } from "rxjs";

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
}
