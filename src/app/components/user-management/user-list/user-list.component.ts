import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users!: User[];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

 private loadUsers(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.log('Error fetching users:', error);
      }
    );
  }

  deleteUser(id: string | undefined): void {
    if (confirm('Are you sure you want to delete this user?') && id!==undefined) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.loadUsers();
        },
        error => {
          console.log('Error deleting user:', error);
        }
      );
    }
  }

  navigateToAddUser(): void {
    this.router.navigate(['/add-user']);
  }

  navigateToEditUser(id: string | undefined): void {
    this.router.navigate(['/edit-user', id]);
  }
}