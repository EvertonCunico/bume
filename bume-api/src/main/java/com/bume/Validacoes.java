package com.bume;
import javax.enterprise.context.RequestScoped;
import java.lang.reflect.Array;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.Map;

@RequestScoped
public class Validacoes {

    public String desserializarData(String data) {
        Date date = null;
        String retorno = "";
        SimpleDateFormat simpleDateFormat = null;
        try {
            if (data != null) {
                date = new Date(data);
                simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
                retorno = simpleDateFormat.format(date);
            }
        } catch(Exception e) {
            retorno = "";
        }
        return retorno;
    }

    public String desserializarHora(String hora) {
        Date date = null;
        String retorno = "";
        SimpleDateFormat simpleDateFormat = null;
        try {
            if (hora != null) {
                date = new Date(hora);
                simpleDateFormat = new SimpleDateFormat("HH:mm:ss");
                retorno = simpleDateFormat.format(date);
            }
        } catch(Exception e) {
            retorno = "";
        }
        return retorno;
    }

    public static boolean isEmpty(final Object object) {
        if (object == null) {
            return true;
        }
        if (object instanceof CharSequence) {
            return ((CharSequence) object).length() == 0;
        }
        if (object.getClass().isArray()) {
            return Array.getLength(object) == 0;
        }
        if (object instanceof Collection<?>) {
            return ((Collection<?>) object).isEmpty();
        }
        if (object instanceof Map<?, ?>) {
            return ((Map<?, ?>) object).isEmpty();
        }
        return false;
    }
}