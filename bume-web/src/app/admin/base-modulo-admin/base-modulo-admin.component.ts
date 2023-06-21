import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { MenuService } from '@estrutura/menu/menu.service';

@Component({
  selector: 'app-base-modulo-admin',
  templateUrl: './base-modulo-admin.component.html',
  styleUrls: ['./base-modulo-admin.component.css']
})
export class BaseModuloAdminComponent implements OnInit {

  constructor(private menuService: MenuService, public adminService: AdminService) { }

  ngOnInit(): void {
  }
}
