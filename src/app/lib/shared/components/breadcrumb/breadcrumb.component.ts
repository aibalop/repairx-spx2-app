import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { DashboardRoutes } from 'src/app/lib/core/enums/modules-routes.enum';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {

  breadcrumbs = [];

  currentUrl = '';

  DashboardRoutes = DashboardRoutes;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.breadcrumbs = this.currentUrl.substring(1).split('/');
      }
    });
  }

  ngOnInit() { }

}
