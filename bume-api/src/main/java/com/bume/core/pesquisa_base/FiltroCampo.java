package com.bume.core.pesquisa_base;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FiltroCampo {
    private String campo;
    private String comparador;
    private Object valor;
}
