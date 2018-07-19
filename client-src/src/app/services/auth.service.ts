import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { user } from "../models/user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseapiURL: string = "http://localhost:5000/api";
  authToken: string;
  user;
  constructor(private httpClient: HttpClient) {}

  loginUser(userCredentials): Observable<user> {
    return this.httpClient.post<user>(
      this.baseapiURL + "/users/login",
      userCredentials
    );
  }

  storeUserInfo(token, user) {
    localStorage.clear();
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
}
