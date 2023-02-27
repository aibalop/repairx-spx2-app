import { Component, OnInit } from '@angular/core';
import { EDateFilterOption } from 'src/app/lib/core/enums/helpers-emuns.enum';
import { ESettingsRoutes } from 'src/app/lib/core/enums/modules-routes.enum';
import { IFilterGeneric } from 'src/app/lib/core/interfaces/filter-generic.interface';
import { SessionService } from 'src/app/lib/core/services/session.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.page.html',
  styleUrls: ['./home-dashboard.page.scss'],
})
export class HomeDashboardPage implements OnInit {

  settingsRoutes = ESettingsRoutes;

  constructor(
    public sessionService: SessionService,
  ) { }

  ngOnInit() {
  }

}
