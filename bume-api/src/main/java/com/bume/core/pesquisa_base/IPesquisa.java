package com.bume.core.pesquisa_base;

import java.util.Map;

public interface IPesquisa<T> {

    Class<T> getClasse();

    Map<String, String> getListaCampos();

    Map<String, Class<?>> getCamposFiltro();

    String getTabela();

    String getJoins();

    ObjetoPesquisa<T> pesquisa(RequestPesquisa request) throws Exception;

}
