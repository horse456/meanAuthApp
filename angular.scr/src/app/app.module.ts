import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

import { ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from './services/dashboard.service';
import { SmartComponent } from './components/dashboard/smart/smart.component';
import { RehearsalComponent } from './components/dashboard/rehearsal/rehearsal.component';
import { OperationComponent } from './components/dashboard/operation/operation.component';
import { AskComponent } from './components/dashboard/ask/ask.component';
import { DealComponent } from './components/dashboard/deal/deal.component';
import { ResumeComponent } from './components/dashboard/resume/resume.component';
import { TodoComponent } from './components/dashboard/todo/todo.component';
import { DynamicComponent } from './components/dashboard/dynamic/dynamic.component';
import { EmotionComponent } from './components/dashboard/emotion/emotion.component';
import { LogicComponent } from './components/dashboard/logic/logic.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    SmartComponent,
    RehearsalComponent,
    OperationComponent,
    AskComponent,
    DealComponent,
    ResumeComponent,
    TodoComponent,
    DynamicComponent,
    EmotionComponent,
    LogicComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    DashboardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
