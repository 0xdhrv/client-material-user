import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignupComponent } from './signup/signup.component';
import { RegisterComponent } from './register/register.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { CreateGarageComponent } from './create-garage/create-garage.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Log In'
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'Sign Up'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register'
    }
  },
  {
    path: 'edit-user',
    component: EditUserComponent,
    data: {
      title: 'Edit User'
    }
  },
  {
    path: 'create-garage',
    component: CreateGarageComponent,
    data: {
      title: 'Create Garage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
