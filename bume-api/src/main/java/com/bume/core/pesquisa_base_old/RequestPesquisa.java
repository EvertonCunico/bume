package com.bume.core.pesquisa_base_old;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
public class RequestPesquisa {

    private int pagina;

    private int quantidade;

    private Long id;

    private String valorPesquisa;

    private Map<String, Object> filtrosPersonalizados;
}
