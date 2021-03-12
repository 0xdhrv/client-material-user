/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
// import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class UsersComponent implements OnInit {
  users: User[];
  filteredUsers: User[];
  userSource: MatTableDataSource<User>;
  expandedElement: User | null;
  userColumnsToDisplay = [
    'name',
    'email',
    'city',
    'phone',
    'created',
    'actions'
  ];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userSource.filter = filterValue.trim().toLowerCase();

    if (this.userSource.paginator) {
      this.userSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe((users: User[]) => {
      this.users = users;
      console.log(
        '🚀 ~ file: users.component.ts ~ line 61 ~ UsersComponent ~ this.userService.getAll ~ this.users',
        this.users
      );
      this.filteredUsers = this.users.filter((user) => {
        return user.role != 'Admin';
      });
      console.log(
        '🚀 ~ file: users.component.ts ~ line 65 ~ UsersComponent ~ this.filteredUsers=this.users.filter ~ this.filteredUsers',
        this.filteredUsers
      );
      this.userSource = new MatTableDataSource<User>(this.filteredUsers);

      // this.userSource.paginator = this.paginator;
      this.userSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {}
}
