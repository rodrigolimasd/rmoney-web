import { AuthHttp } from 'angular2-jwt';
import { Headers, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { Pessoa } from '../core/model';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: AuthHttp) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();
    // const headers = new Headers();

   // headers.append('Authorization', 'Basic YWRtaW5AZW1haWwuY29tOmFkbWlu');

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { search: params })
      .toPromise()
      .then(response => {
        const responseJson = response.json();
        const pessoas = responseJson.content;

        const resultado = {
          pessoas,
          total: responseJson.totalElements
        };

        return resultado;
      });
  }

  listarTodas(): Promise<any> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AZW1haWwuY29tOmFkbWlu');

    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
   // const headers = new Headers();
   // headers.append('Authorization', 'Basic YWRtaW5AZW1haWwuY29tOmFkbWlu');
   // headers.append('Content-Type', 'application/json');

    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  excluir(codigo: number): Promise<void> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AZW1haWwuY29tOmFkbWlu');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`)
      .toPromise()
      .then(() => null);
  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {
    // const headers = new Headers();
    // headers.append('Authorization', 'Basic YWRtaW5AZW1haWwuY29tOmFkbWlu');
    // headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

}
