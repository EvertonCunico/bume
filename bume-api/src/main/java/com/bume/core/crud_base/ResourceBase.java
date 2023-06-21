package com.bume.core.crud_base;

import javax.ws.rs.core.Response;
import java.util.List;

public interface ResourceBase<T extends EntityCrudBase> {
    Response incluir(T t);
    Response atualizar(Long id, T t);
    Response excluir(Long id);
    List<T> listarTodos();
}
