import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [];
  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  @ViewChild('tabela') grid;
  /*dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  descricao: string;*/

  constructor(private lancamentoService: LancamentoService) {}

  ngOnInit() {
    // this.pesquisar();
  }

  pesquisar(pagina = 0) {
    /*const filtro: LancamentoFiltro = {
      descricao: this.descricao,
      dataVencimentoInicio: this.dataVencimentoInicio,
      dataVencimentoFim: this.dataVencimentoFim
    };*/
    this.filtro.pagina = pagina;
    this.lancamentoService.pesquisar(this.filtro)
        .then(resultado => {
          this.lancamentos = resultado.lancamentos;
          this.totalRegistros = resultado.total;
        });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .then(() => {
        if (this.grid.first === 0) {
          this.pesquisar();
        } else {
          this.grid.first = 0;
        }
      });
  }
}
