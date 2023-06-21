package com.bume.core.login;

import com.bume.core.login.model.LoginArgs;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("login")
public class LoginResource {
    @Inject
    LoginService service;

    @POST
    public Response login(@Valid LoginArgs loginargs) throws Exception {
        return Response.ok().entity(service.autenticar(loginargs)).build();
    }
}