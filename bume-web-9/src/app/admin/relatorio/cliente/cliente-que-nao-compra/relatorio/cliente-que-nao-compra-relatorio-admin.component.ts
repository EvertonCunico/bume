import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { RelatorioPesquisaClienteSemCompra } from 'app/services/relatorio-pesquisa-cliente-sem-compra.service';

@Component({
  selector: 'app-cliente-que-nao-compra-relatorio-admin',
  templateUrl: './cliente-que-nao-compra-relatorio-admin.component.html',
})
export class RelatorioClienteQueNaoCompraAdminComponent implements OnInit {

  usuarios: any;
  relatorioBlob: any;
  fileToUpload: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private pesquisa: RelatorioPesquisaClienteSemCompra) {
  }

  ngOnInit() {
    this.carregaDados();
  }

  async carregaDados() {

    let dataInicial = '';
    let dataFinal = '';
    let nome = '';

    this.route.queryParams.subscribe(params => {
      nome = params.nome;
      dataFinal = params.dataFinal;
      dataInicial = params.dataInicial;
    });

    this.pesquisa.pesquisarRelatorioClienteSemCompras(nome, dataInicial, dataInicial).subscribe(
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
    this.router.navigate(['/admin/admin-relatorio-cliente-nao-compra/pesquisa']);
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
