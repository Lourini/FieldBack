import { Component, ElementRef, Renderer2, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './login/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {



  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router, private route: ActivatedRoute,private authService : AuthService) { }

  ngOnInit(){
    document.body.style.backgroundColor = '#ffff';
  }

  sideMenuOpenClose() {
    const sideNavID = this.el.nativeElement.querySelector('#SideNavID');
    const contentOverlayID = this.el.nativeElement.querySelector('#ContentOverlayID');
    const menuText = this.el.nativeElement.querySelectorAll('.menuText');

    if (sideNavID.classList.contains('sideNavClose')) {
      sideNavID.classList.remove('sideNavClose');
      sideNavID.classList.add('sideNavOpen');
      menuText.forEach((text: any) => text.classList.remove('d-none'));
      contentOverlayID.classList.remove('ContentOverlayClose');
      contentOverlayID.classList.add('ContentOverlay');
    } else {
      sideNavID.classList.remove('sideNavOpen');
      sideNavID.classList.add('sideNavClose');
      menuText.forEach((text: any) => text.classList.add('d-none'));
      contentOverlayID.classList.remove('ContentOverlay');
      contentOverlayID.classList.add('ContentOverlayClose');
    }
  }

  goBack() {
    if (history.length === 1) {
      this.router.navigate(['/ListClients']);
    } else {
      history.back();
    }
  }

  Logout() {
    this.authService.logout();
  }
  isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }


}