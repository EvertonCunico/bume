import { DecimalPipe } from '@angular/common';
import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { UsuarioPesquisaService } from 'app/services/usuario-pesquisa.service';

@Component({
  selector: 'app-usuario-relatorio-admin',
  templateUrl: './usuario-relatorio-admin.component.html',
})
export class RelatorioUsuarioAdminComponent implements OnInit {

  usuarios: any;
  relatorioBlob: any;
  fileToUpload: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private pesquisa: UsuarioPesquisaService) {
  }

  ngOnInit() {
    this.carregaDados();
  }

  async carregaDados() {

    let id = 0;
    let valor = '';
    let estabelecimento = '';
    let nome = '';
    let cpf = '';
    let grupo = '';

    this.route.queryParams.subscribe(params => {
      id = params.id;
      valor = params.valor;
      estabelecimento = params.estabelecimento;
      nome = params.nome;
      cpf = params.cpf;
      grupo = params.grupo;
    });

    this.pesquisa.pesquisarRelatorio(valor, estabelecimento, nome, cpf, grupo).subscribe(
      resultado => {
        this.usuarios = resultado.data;
      }
    );
    while (!this.usuarios) {
      await this.delay(1000);
    }
  }

  gerarPDF() {
    this.htmltoPDF(false);
  }

  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  cancelar() {
    this.router.navigate(['/admin/usuario/pesquisa']);
  }

  htmltoPDF(output: boolean) {
    window.scroll(0, 0);
    html2canvas(document.querySelector('#relatorio')).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 200;
      const pageHeight = 285;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const doc = new jsPDF('p', 'mm');
      let position = 5;

      doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      this.relatorioBlob = undefined;
      if (!output) {
        doc.save('Relatorio.pdf');
      } else {
        this.fileToUpload = doc.output();
      }
    });
  }

  getSituacao(ativo: string): string {
    if ('S' === ativo) {
      return 'Sim';
    }
    return 'Não';
  }

}
