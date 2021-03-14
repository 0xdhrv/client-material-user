import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users/users.component';
import { SpacesComponent } from './spaces/spaces.component';
import { GaragesComponent } from './garages/garages.component';
import { ParkingsComponent } from './parkings/parkings.component';
import { ParkingHistoriesComponent } from './parking-histories/parking-histories.component';
import { HomeComponent } from './home/home.component';
import { EditUserComponent } from 'src/app/admin/edit-user/edit-user.component';
import { CreateUserComponent } from './create-user/create-user.component';

// import { AuthGuard } from 'src/app/_helpers/auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/home',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Admin'
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Admin > Users'
    }
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    data: {
      title: 'Admin > Create Users'
    }
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    data: {
      title: 'Admin > Edit User'
    }
  },
  {
    path: 'garages',
    component: GaragesComponent,
    data: {
      title: 'Admin > Space'
    }
  },
  {
    path: 'spaces',
    component: SpacesComponent,
    data: {
      title: 'Admin > Space'
    }
  },
  {
    path: 'parkings',
    component: ParkingsComponent,
    data: {
      title: 'Admin > Parking'
    }
  },
  {
    path: 'parkinghistories',
    component: ParkingHistoriesComponent,
    data: {
      title: 'Admin > ParkingHistory'
    }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
