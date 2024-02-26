import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  editMode: boolean = false;
  userId: string | null = null;
  user: User = {username: '',firstname: '',lastname: '',email: '',phone: '',role: '',password: ''};
  newPassword: string = '';
  confirmPassword: string = '';
  formSubmitted: boolean = false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id');
    if (this.userId) {
      this.editMode = true;
      this.loadUser();
    }
  }

  loadUser(): void {
    if (this.userId) {
      this.userService.getUserById(this.userId).subscribe(
        user => {
          this.user = user;
        },
        error => {
          console.log('Error fetching user:', error);
        }
      );
    }
  }

  saveUser(): void {
    this.formSubmitted = true;
    if (!this.isFormValid()) {
      console.log('Invalid form data.');
      return;
    }
    const formData = this.user;
    if (this.editMode && this.userId) {
      this.userService.updateUser(this.userId, formData).subscribe(
        () => {
          console.log('Utilisateur mis à jour avec succès.');
          // Show success message in French here
          this.router.navigate(['/user-list']);
        },
        error => {
          console.log('Error updating user:', error);
        }
      );
    } else {
      this.userService.createUser(formData).subscribe(
        () => {
          console.log('Utilisateur créé avec succès.');
          // Show success message in French here
          this.router.navigate(['/user-list']);
        },
        error => {
          console.log('Error creating user:', error);
        }
      );
    }
  }

  isFormValid(): boolean {
    if (!this.user.firstname || !this.user.lastname || !this.user.username || !this.newPassword || !this.confirmPassword || !this.user.email || !this.user.phone || !this.user.role) {
      return false;
    }
    if (this.newPassword !== this.confirmPassword) {
      return false;
    }
    return true;
  }
  
}
