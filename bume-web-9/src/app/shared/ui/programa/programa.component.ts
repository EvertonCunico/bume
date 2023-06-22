import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ControladorProgramaService } from '@boom/services/programa/controlador-programa.service';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css'],
  providers: [
    ControladorProgramaService
  ]
})
export class ProgramaComponent implements OnInit, AfterViewInit {

  constructor(private controlador: ControladorProgramaService) { }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

  }

}
