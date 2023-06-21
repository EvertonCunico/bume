package com.bume.core.interceptors;

import com.bume.core.security.jwt.Token;
import com.bume.core.security.service.ContextoRequisicao;
import com.bume.core.security.service.Logado;
import com.bume.core.security.service.PermissoesAcesso;
import com.bume.core.security.service.SecurityService;
import com.bume.core.util.StringUtil;
import io.quarkus.security.ForbiddenException;
import io.quarkus.security.UnauthorizedException;
import io.vertx.core.http.HttpMethod;
import org.apache.commons.io.IOUtils;

import javax.inject.Inject;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.ext.Provider;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

@Provider
public class RequestInterceptor implements ContainerRequestFilter {
    private final List<String> URL_FREE = Arrays.asList("openapi", "swagger-ui", "/login");
    @Context
    ResourceInfo resourceInfo;
    @Inject
    Logado logado;

    @Inject
    ContextoRequisicao contextoRequisicao;

    @Override
    public void filter(ContainerRequestContext requestContext) {
        Method method = resourceInfo.getResourceMethod();
        if (requestContext.getMediaType() != null && requestContext.getMediaType().equals(MediaType.APPLICATION_JSON_TYPE)) {
            try {
                ByteArrayOutputStream b = new ByteArrayOutputStream();
                IOUtils.copy(requestContext.getEntityStream(), b);
                byte[] data = new ByteArrayInputStream(b.toByteArray()).readAllBytes();
                contextoRequisicao.setPayloadJson(new String(data, StandardCharsets.UTF_8));

                requestContext.setEntityStream(new java.io.ByteArrayInputStream(data));
            } catch (Exception ignored) {
            }
        }
        if (requestContext.getMethod().equals(HttpMethod.OPTIONS) || URL_FREE.stream().filter(i -> requestContext.getUriInfo().getPath().contains(i)).findFirst().isPresent()) {
            return;
        }
        String token = requestContext.getHeaderString("Authorization");
        if (StringUtil.isEmpty(token)) {
            throw new UnauthorizedException("Você não está autenticado!");
        }
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        if (!SecurityService.isValidToken(token)) {
            throw new UnauthorizedException("Você não está autenticado!");
        }
        Token tk = SecurityService.getToken(token);
        logado.setToken(tk);
        if (method.isAnnotationPresent(PermissoesAcesso.class)) {
            boolean permitido = Arrays.asList(method.getAnnotation(PermissoesAcesso.class).perfis()).contains(tk.getUser().getTipoAcesso());
            if (!permitido) {
                throw new ForbiddenException("Você não tem permissão para executar essa ação!");
            }
        }

        SecurityService.refreshToken(token);
    }
}