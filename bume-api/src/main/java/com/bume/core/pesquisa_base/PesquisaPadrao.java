package com.bume.core.pesquisa_base;

import com.bume.core.util.ListUtil;
import com.bume.core.util.StringUtil;
import org.apache.commons.lang3.NotImplementedException;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

@RequestScoped
public abstract class PesquisaPadrao <T> implements IPesquisa<T>{

    @Inject
    EntityManager em;

    @Override
    public ObjetoPesquisa<T> pesquisa(RequestPesquisa request) throws InstantiationException, IllegalAccessException {
        ObjetoPesquisa<T> objetoPesquisa = new ObjetoPesquisa<>();

        Query q = montaQueryCount(request);
        BigInteger quantidade = (BigInteger) q.getSingleResult();
        objetoPesquisa.setTotalRegistros(quantidade.longValue());

        q = montaQueryRegistros(request);
        List<Object[]> tuples = q.getResultList();

        objetoPesquisa.setRegistros(converterRegistros(tuples));
        objetoPesquisa.setPagina(request.getPagina());
        return objetoPesquisa;
    }

    protected List<T> converterRegistros(List<Object[]> tuples) {
        throw new NotImplementedException();
    }

    protected int getIndexListaCampos(String campo) {
        int i = 0;
        for (var c : this.getListaCampos().entrySet()) {
            if (c.getValue().equals(campo)) {
                return i;
            }
            i++;
        }
        return -1;
    }

    protected Query montaQueryCount(RequestPesquisa request) {
        StringBuilder sql = new StringBuilder();
        sql.append("select count(*) from ").append(getTabela());
        if (StringUtil.isNotEmpty(getJoins())) {
            sql.append(" ").append(getJoins()).append(" ");
        }
        if (request.getFiltroPesquisa() != null && ListUtil.isNotEmpty(request.getFiltroPesquisa().getFiltros())) {
            sql.append(getFiltros(request.getFiltroPesquisa()));
        }
        Query q = em.createNativeQuery(sql.toString());
        montarParametros(request.getFiltroPesquisa(), q);
        return q;
    }

    protected Query montaQueryRegistros(RequestPesquisa requestPesquisa) {
        StringBuilder sql = new StringBuilder();
        sql.append("select ");
        int i = 1;
        for (var campo : this.getListaCampos().entrySet()) {
            sql.append(campo.getKey()).append(" as \"").append(campo.getValue()).append("\"");
            if (i < this.getListaCampos().size()) {
                sql.append(", ");
            }
            i++;
        }
        sql.append(" from ").append(getTabela());
        if (StringUtil.isNotEmpty(getJoins())) {
            sql.append(" ").append(getJoins()).append(" ");
        }
        if (requestPesquisa.getFiltroPesquisa() != null && ListUtil.isNotEmpty(requestPesquisa.getFiltroPesquisa().getFiltros())) {
            sql.append(getFiltros(requestPesquisa.getFiltroPesquisa()));
        }
        if (ListUtil.isNotEmpty(requestPesquisa.getOrdenacao())) {
            sql.append(" order by ");
            Iterator<String> iterator = requestPesquisa.getOrdenacao().iterator();
            while (iterator.hasNext()) {
                sql.append(iterator.next());
                if (iterator.hasNext()) {
                    sql.append(", ");
                }
            }
        }
        if (requestPesquisa.getPagina() != null && requestPesquisa.getQuantidadeRegistros() != null) {
            sql.append(" limit ").append(requestPesquisa.getQuantidadeRegistros()   ).append(" offset ").append((requestPesquisa.getPagina() - 1) * requestPesquisa.getQuantidadeRegistros());
        }
        Query q = em.createNativeQuery(sql.toString());
        montarParametros(requestPesquisa.getFiltroPesquisa(), q);
        return q;
    }

    protected void montarParametros(FiltroPesquisa filtroPesquisa, Query query) {
        for (var campo : this.getCamposFiltro().entrySet()) {
            Optional<?> opt = query.getParameters().stream().filter(i->i.getName().equals(campo.getKey())).findAny();
            if (opt.isPresent()) {
                for (FiltroGrupo g : filtroPesquisa.getFiltros()) {
                    for (FiltroCampo c :g.getCampos()) {
                        if (c.getCampo().equalsIgnoreCase(campo.getKey())) {
                            query.setParameter(campo.getKey(), c.getValor());
                        }
                    }
                }
            }
        }
    }

    protected StringBuilder getFiltros(FiltroPesquisa filtroPesquisa) {
        StringBuilder filtros = new StringBuilder();
        if (ListUtil.isNotEmpty(filtroPesquisa.getFiltros())) {
            filtros.append(" where ");
        }
        int i = 0;
        int j = 0;
        for (FiltroGrupo grupo : filtroPesquisa.getFiltros()) {
            if (grupo.getCampos() != null) {
                filtros.append(" ( ");
                for (FiltroCampo campo : grupo.getCampos()) {
                    filtros.append(campo.getCampo()).append(" ").append(campo.getComparador()).append(" :").append(campo.getCampo());
                    if (j < (grupo.getCampos().size() - 1)) {
                        filtros.append(" ").append(grupo.getOperador()).append(" ");
                    }
                    j++;
                }
                filtros.append(" ) ");
            }
            if (i < filtroPesquisa.getFiltros().size() - 1) {
                filtros.append( " and ");
            }
            i++;
        }
        return filtros;
    }
}
