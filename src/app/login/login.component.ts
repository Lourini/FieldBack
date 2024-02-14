import { Component, ElementRef, AfterViewInit, Renderer2, ViewChild, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  @Inject(Document) private document!: Document;
  @ViewChild('inputElement1') inputElement1!: ElementRef;
  @ViewChild('inputElement2') inputElement2!: ElementRef;


  username = '';
  password = '';

  constructor(private router: Router, private renderer: Renderer2, private authService: AuthService) {
  }

  ngOnInit() {
    document.body.style.backgroundColor = '#023C82';
  }
  ngAfterViewInit(): void {
    this.inputElement1.nativeElement.addEventListener('focus', this.addFocus.bind(this));
    this.inputElement1.nativeElement.addEventListener('blur', this.removeFocus.bind(this));

    this.inputElement2.nativeElement.addEventListener('focus', this.addFocus.bind(this));
    this.inputElement2.nativeElement.addEventListener('blur', this.removeFocus.bind(this));
  }

  addFocus(event: any) {
    const parent = event.target.parentNode.parentNode;
    parent.classList.add('focus');
  }

  removeFocus(event: any) {
    const parent = event.target.parentNode.parentNode;
    if (event.target.value === '') {
      parent.classList.remove('focus');
    }
  }

  login() {
    this.authService.login(this.username,this.password);
  }
  
}
