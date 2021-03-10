/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs/operators';
// import { HttpProviderService } from '../_services/http-provider.service';
import { Space } from '../_models';
import { HttpClient } from '@angular/common/http';
import {
  UserService,
  GarageService,
  SpaceService,
  ParkingService
} from '../_services';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
