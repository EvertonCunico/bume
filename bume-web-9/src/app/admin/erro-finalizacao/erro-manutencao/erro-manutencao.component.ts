import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ManutencaoViewBase } from '@boom/ui/views/manutencao-view-base';
import { Ticket } from 'app/modelos/ticket';
import { TicketErp } from 'app/modelos/ticket-erp';
import { TicketCRUDService } from 'app/services/ticket-crud.service';
import { TicketErpPesquisaService } from 'app/services/ticket-erp-pesquisa.service';
@Component({
  selector: 'app-erro-manutencao',
  templateUrl: './erro-manutencao.component.html',
  styleUrls: ['./erro-manutencao.component.css'],
  providers: [TicketErpPesquisaService]
})
export class ErroFinalizacaoManutencaoComponent extends ManutencaoViewBase<Ticket> implements OnInit {
  finalizacoes = [];
  //
  showFinalizacao = false;
  formFinalizacao: FormGroup;

  constructor(protected injector: Injector,
              public ticketCRUDService: TicketCRUDService,
              public ticketErpPesquisa: TicketErpPesquisaService) {
    super(injector, ticketCRUDService);
    this.titulo = 'Técnico / Logs / Tickets';
    this.form = this.formBuilder.group({
      codigo_comanda: '',
      estabelecimento: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      mesa: ['', [Validators.required]],
    });
    this.form.disable();
    this.formFinalizacao = this.formBuilder.group({
      mensagem: undefined,
      data_hora: undefined
    });
    this.formFinalizacao.disable();
  }

  onRegistroCarregado(registro: any) {
    this.carregaFinalizacoesTicket();
  }

  carregaFinalizacoesTicket() {
    this.ticketErpPesquisa.pesquisaPorTicket(this.registroId).subscribe(
      dados => {
        this.finalizacoes = dados;
      }
    );
  }

  abrirFinalizacao(log: TicketErp) {
    this.formFinalizacao.get('mensagem').patchValue(log.mensagem);
    this.formFinalizacao.get('data_hora').patchValue(log.data_hora);
    this.showFinalizacao = true;
  }
}