package com.bume;
import com.ordnaelmedeiros.jpafluidselect.querybuilder.select.pagination.PaginationResult;
import javax.enterprise.context.RequestScoped;
import javax.persistence.EntityManager;
import org.hibernate.Query;
import org.hibernate.Session;
import java.math.BigDecimal;
import java.util.List;

@RequestScoped
public class Dados {
    public static <T> PaginationResult<T> geraLista(List<T> lista, Integer pagina, Long totalRows) throws Exception {
        PaginationResult<T> list = new PaginationResult<T>();
        list.getData().addAll(lista);
        list.setPageSize(50);
        list.setPageNumber(pagina);
        list.setLastPage((int) Math.ceil(new BigDecimal(totalRows).divide(new BigDecimal(50)).doubleValue()));
        list.setTotalRows(totalRows);
        return list;
    }

    public static Long getSequenceValue(EntityManager em, String sequence) {
        try {
            String sql = "SELECT last_value FROM "+sequence;
            Query qr = em.unwrap(Session.class).createSQLQuery(sql);
            Long ret = Long.valueOf(qr.getSingleResult().toString());
            return ret+1;
        } catch (Exception e) {
            return Long.valueOf(0);
        }
    }
}