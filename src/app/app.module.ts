import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { RegisterComponent } from './register/register.component';

// Services
import { UserService } from './_services/user.service';

// Material Module
import { MaterialModule } from './material.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { HttpProviderService } from './_services/http-provider.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SignupComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LoadingBarRouterModule,
    HttpClientModule
  ],
  providers: [Title, UserService, HttpProviderService],
  bootstrap: [AppComponent]
})
export class AppModule {}
