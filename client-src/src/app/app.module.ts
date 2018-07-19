import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LoginComponent } from "./components/login/login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NewSubmissionComponent } from "./components/new-submission/new-submission.component";
import { ViewSubmissionsComponent } from "./components/view-submissions/view-submissions.component";
import { ConfigureNotificationsComponent } from "./components/configure-notifications/configure-notifications.component";
import { ViewNotificationsComponent } from "./components/view-notifications/view-notifications.component";

import { AuthService } from "./services/auth.service";

const appRoutes: Routes = [
  { path: "", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "new-submission", component: NewSubmissionComponent },
  { path: "view-submissions", component: ViewSubmissionsComponent },
  {
    path: "configure-notifications",
    component: ConfigureNotificationsComponent
  },
  {
    path: "view-notifications",
    component: ViewNotificationsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    NewSubmissionComponent,
    ViewSubmissionsComponent,
    ConfigureNotificationsComponent,
    ViewNotificationsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
