import { Component, OnInit } from '@angular/core';
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
        pathname: '/inicio',
        icon: 'home',
        name: 'Inicio',
        open: false
      }
    },
    {
      parent: {
        pathname: '/catalogos',
        icon: 'cube',
        name: 'Catalogos',
        open: false
      },
      childs: [
        {
          pathname: '/catalogos/cargos',
          icon: 'cash',
          name: 'Cargos'
        },
        {
          pathname: '/catalogos/servicios',
          icon: 'hammer',
          name: 'Servicios'
        }
      ]
    },
    {
      parent: {
        pathname: '/customers',
        icon: 'people',
        name: 'Clientes',
        open: false
      }
    },
    {
      parent: {
        pathname: '/order-repairs',
        icon: 'journal',
        name: 'Ordenes',
        open: false
      }
    },
  ];

  constructor(
    public sessionService: SessionService
  ) { }

  ngOnInit() { }

}