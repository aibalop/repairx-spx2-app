import { Component, OnInit } from '@angular/core';
import { ECatalogsRoutes, ECustomersRoutes, EDashboardRoutes, EOrderRepairsRoutes, EOrdersReportRoutes } from 'src/app/lib/core/enums/modules-routes.enum';
import { SessionService } from 'src/app/lib/core/services/session.service';

interface Permission {
  parent?: {
    pathname: string;
    icon: string;
    name: string;
    open: boolean;
  };
  childs?: Array<{
    pathname: string;
    icon: string;
    name: string;
  }>;
};

@Component({
  selector: 'app-panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.scss'],
})
export class PanelLayoutComponent implements OnInit {

  permissions: Array<Permission> = [
    {
      parent: {
        pathname: EDashboardRoutes.HOME,
        icon: 'home',
        name: 'Inicio',
        open: false
      }
    },
    {
      parent: {
        pathname: ECatalogsRoutes.CATALOGS,
        icon: 'cube',
        name: 'Catalogos',
        open: false
      },
      childs: [
        {
          pathname: ECatalogsRoutes.CHARGES,
          icon: 'cash',
          name: 'Cargos'
        },
        {
          pathname: ECatalogsRoutes.WORKS,
          icon: 'hammer',
          name: 'Servicios'
        }
      ]
    },
    {
      parent: {
        pathname: ECustomersRoutes.CUSTOMERS,
        icon: 'people',
        name: 'Clientes',
        open: false
      }
    },
    {
      parent: {
        pathname: EOrderRepairsRoutes.ORDER_REPAIRS,
        icon: 'journal',
        name: 'Ordenes',
        open: false
      }
    },
    {
      parent: {
        pathname: EOrdersReportRoutes.ORDERS_REPORT,
        icon: 'bar-chart-outline',
        name: 'Reporte de ordenes',
        open: false
      }
    },
  ];

  constructor(
    public sessionService: SessionService
  ) { }

  ngOnInit() { }

}