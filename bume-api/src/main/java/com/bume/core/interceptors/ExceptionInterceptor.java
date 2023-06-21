package com.bume.core.interceptors;

import com.bume.core.exceptions.ValidacaoException;
import com.bume.core.security.service.ContextoRequisicao;
import com.bume.core.util.StringUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class ExceptionInterceptor implements ExceptionMapper<Throwable> {

    @Inject
    ContainerRequestContext containerRequestContext;

    @Override
    public Response toResponse(Throwable e) {
        String mensagem = "Erro padrão do sistema!";
        if (e instanceof ValidacaoException) {
            mensagem = "" + ((ValidacaoException) e).getMensagem();
        } else if (StringUtil.isNotEmpty(e.getMessage())) {
            mensagem = e.getMessage();
        }
        if (mensagem.length() > 127) {
            mensagem = mensagem.substring(0, 127);
        }
        String stack = null;
        try {
            ObjectMapper mapper = new ObjectMapper();
            String mapped = mapper.writeValueAsString(e.getStackTrace());
            Integer end = (mapped.length() > 1024) ? 1024 : mapped.length();
            stack = mapped.substring(0, end);
        } catch (Exception ignored) {
        }

        e.printStackTrace();

        if (e instanceof ValidacaoException) {
            return Response.status(((ValidacaoException) e).getStatus())
                    .entity(((ValidacaoException) e).getMensagem())
                    .build();
        }

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity("Error: " + mensagem)
                .build();
    }

    private String getRequestedPath() {
        return containerRequestContext.getUriInfo().getRequestUri().getPath();
    }
}
