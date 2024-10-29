import { RouterOutlet, RouterModule, Router, NavigationEnd } from '@angular/router';
import { Component, NgModule, OnInit, Inject, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location, DOCUMENT } from '@angular/common';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { filter, Subscription } from 'rxjs';

import { SharedModule } from './shared/shared.module'; // Import your shared module
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, SharedModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Change styleUrl to styleUrls
})
export class AppComponent implements OnInit {
    private _router: Subscription = new Subscription(); // Initialize with a new Subscription
    @ViewChild(NavbarComponent) navbar!: NavbarComponent; // Use definite assignment operator (!)

    constructor(
        private renderer: Renderer2,
        private router: Router,
        @Inject(DOCUMENT) private document: Document,
        private element: ElementRef,
        public location: Location
    ) {}

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];

        this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            if (typeof window !== 'undefined') { // Check if window is defined
                if (window.outerWidth > 991) {
                    window.document.children[0].scrollTop = 0;
                } else {
                    const activeElement = window.document.activeElement as HTMLElement | null; // Type assertion
                    if (activeElement) {
                        activeElement.scrollTop = 0;
                    }
                }
                this.navbar.sidebarClose();
            }
        });

        this.renderer.listen('window', 'scroll', (event) => {
            if (typeof window !== 'undefined') { // Check if window is defined
                const number = window.scrollY;
                if (number > 150 || window.pageYOffset > 150) {
                    navbar.classList.remove('navbar-transparent');
                } else {
                    navbar.classList.add('navbar-transparent');
                }
            }
        });

        const ua = typeof window !== 'undefined' ? window.navigator.userAgent : ''; // Check if window is defined
        const trident = ua.indexOf('Trident/');
        let version: number | undefined; // Declare version variable

        if (trident > 0) {
            const rv = ua.indexOf('rv:');
            version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        if (version) {
            const body = this.document.getElementsByTagName('body')[0];
            body.classList.add('ie-background');
        }
    }

    removeFooter(): boolean {
        const titlee = this.location.prepareExternalUrl(this.location.path()).slice(1);
        return !(titlee === 'signup' || titlee === 'nucleoicons');
    }
}
