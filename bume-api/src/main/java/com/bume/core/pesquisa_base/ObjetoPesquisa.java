package com.bume.core.pesquisa_base;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ObjetoPesquisa<T> {
    List<T> registros;
    Integer pagina;
    Long totalRegistros;
}
