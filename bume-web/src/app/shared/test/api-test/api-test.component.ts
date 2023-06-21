import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { isObject } from 'util';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.css']
})
export class ApiTestComponent {

  formTest: FormGroup;

  funcoes = {
    '<gerarCNPJ>': 'gerarCNPJ'
  };

  verbos = [
    { label: 'GET', value: 'GET' },
    { label: 'POST', value: 'POST' },
    { label: 'PUT', value: 'PUT' },
    { label: 'DELETE', value: 'DELETE' },
  ];

  iDado = 0;
  dados = [];

  progresso = 0;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {

    this.formTest = this.formBuilder.group({
      api: [environment.api, [Validators.required]],
      endPoint: ['empresa', [Validators.required]],
      verbo: [{ label: 'POST', value: 'POST' }, [Validators.required]],
      dados: [''],
    });

    this.formTest.get('dados').valueChanges.subscribe(
      dadosJSON => {
        try {
          const dados = JSON.parse(dadosJSON);
          this.dados = [];
          if (dados) {
            if (dados instanceof Array) {
              dados.forEach(
                dado => {
                  for (let key in dado) {
                    if (this.funcoes[dado[key]]) {
                      dado[key] = (this[this.funcoes[dado[key]]]());
                    }
                  }
                }
              );
              this.dados = dados;
            }
          }
        } catch (erro) {

        }
      }
    );
  }

  get url() {
    return this.formTest.get('api').value + '/' + this.formTest.get('endPoint').value;
  }

  submeterFormTest(): void {
    this.progresso = 0;
    this.iDado = 0;
    switch (this.formTest.get('verbo').value.value) {
      case 'GET':
        this.executarGET();
        break;
      case 'POST':
        this.executarPOST();
        break;
      case 'PUT':
        this.executarPUT();
        break;
      case 'DELETE':
        this.executarDELETE();
        break;
    }
  }

  executarGET() {

  }

  executarPOST() {
    this.formTest.disable();
    this.progresso = Math.floor((this.iDado / this.dados.length) * 100);
    const dado = this.dados[this.iDado];
    this.httpClient.post(this.url, dado).subscribe(
      r => {
        this.iDado++;
        if (this.iDado < this.dados.length) {
          this.executarPOST();
        } else {
          this.progresso = 100;
          this.formTest.enable();
        }
      }
    );
  }

  executarPUT() {

  }

  executarDELETE() {

  }


  /** FUNÇÕES AUXILIARES */

  gerarCNPJ() {

    let cnpj;
    const comPontos = false;

    const n = 9;
    const n1 = this.randomiza(n);
    const n2 = this.randomiza(n);
    const n3 = this.randomiza(n);
    const n4 = this.randomiza(n);
    const n5 = this.randomiza(n);
    const n6 = this.randomiza(n);
    const n7 = this.randomiza(n);
    const n8 = this.randomiza(n);
    const n9 = 0;  // randomiza(n);
    const n10 = 0; // randomiza(n);
    const n11 = 0; // randomiza(n);
    const n12 = 1; // randomiza(n);

    let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;

    d1 = 11 - (this.mod(d1, 11));
    if (d1 >= 10) {
      d1 = 0;
    }

    let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
    d2 = 11 - (this.mod(d2, 11));
    if (d2 >= 10) {
      d2 = 0;
    }

    if (comPontos) {
      cnpj = '' + n1 + n2 + '.' + n3 + n4 + n5 + '.' + n6 + n7 + n8 + '/' + n9 + n10 + n11 + n12 + '-' + d1 + d2;
    } else {
      cnpj = '' + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + n10 + n11 + n12 + d1 + d2;
    }

    return cnpj;
  }

  randomiza(n) {
    const ranNum = Math.round(Math.random() * n);
    return ranNum;
  }

  mod(dividendo, divisor) {
    return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
  }

}
