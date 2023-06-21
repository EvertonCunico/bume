package com.bume;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/hello")
public class ResourceTeste {
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "ChillApp está ativo!";
    }
}