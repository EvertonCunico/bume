import { Component, OnInit } from '@angular/core';
import { MenuService } from '@estrutura/menu/app.menu.service';
import { AdminService } from '../services/admin.service';

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