import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EditUserDialogComponent } from 'src/app/Dialogs/edit-user-dialog/edit-user-dialog.component';
import UserData from 'src/app/Models/UserData';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/ModelServices/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource !: MatTableDataSource<UserData>;
  searchForm !: FormGroup;
  displayedColumns!: string[];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private authService: AuthService, private route: Router, private userService: UserService, private dialog: MatDialog, private liveAnnouncer: LiveAnnouncer) {
    this.displayedColumns = ["Id", "UserName", "Password", 'Email', 'Is Admin', 'Action'];
   }

  ngOnInit(): void {
    if (!this.authService.LoggedIn() && !this.authService.IsAdmin())
     this.route.navigate(['/']);
    else{
      this.setTable();
    }

  }

  editUser(element: any) {
    this.dialog.open(EditUserDialogComponent, {
      width: "auto",
      maxWidth: "700px",
      data: element

    }).afterClosed().subscribe(val => {
      if (val)
        this.setTable();
    }
    );
  }
  deleteUser(id: number) {
    this.userService.delete(id).subscribe(result => {
      if (result)
        this.setTable();
    });
  }
  setTable() {
      this.userService.getAll().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }
}
