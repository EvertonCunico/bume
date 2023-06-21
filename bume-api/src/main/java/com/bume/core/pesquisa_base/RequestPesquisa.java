package com.bume.core.pesquisa_base;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestPesquisa {
    private FiltroPesquisa filtroPesquisa;
    private List<String> ordenacao;
    private Integer pagina;
    private Integer quantidadeRegistros;
}
