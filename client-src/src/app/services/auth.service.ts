import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { user } from "../models/user";
import { profile } from "../models/profile";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { HttpHeaders } from "@angular/common/http";
import { login } from "../models/login";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  baseapiURL: string = "http://localhost:5000/api";
  authToken: string;
  user;
  login: BehaviorSubject<any> = new BehaviorSubject<any>({ login: false });
  constructor(private httpClient: HttpClient, private router: Router) {}

  loginUser(userCredentials): Observable<user> {
    return this.httpClient.post<user>(
      this.baseapiURL + "/users/login",
      userCredentials
    );
  }

  getProfile(): Observable<any> {
    this.loadToken();
    console.log(this.authToken);
    if (this.authToken == null) {
      this.router.navigate(["/"]);
      this.login.next({ login: false });
    } else {
      this.login.next({ login: true });
    }
    const httpOptions = {
      headers: new HttpHeaders({
        authorization: this.authToken
      })
    };

    return this.httpClient.get<any>(this.baseapiURL + "/profile", httpOptions);
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  isLogin(): Observable<login> {
    return this.login;
  }

  storeUserInfo(token, user) {
    localStorage.clear();
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
    this.login.next({ login: true });
  }

  logout() {
    localStorage.clear();
    this.authToken = null;
    this.user = null;
    this.login.next({ login: false });
  }
}
