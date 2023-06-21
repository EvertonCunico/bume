package com.bume.core.queryMapper;

import java.util.ArrayList;
import java.util.List;

public class Conversor<T> {
    final private Class<T> tClass;
    final private Object value;
    private List<ConversorBase<T>> converts;

    public Conversor(Class<T> tClass, Object value) {
        this.tClass = tClass;
        this.value = value;
        this.converts = new ArrayList<>();

        insertConverts();
    }

    private void insertConverts() {
        converts.add(new ConversorObject<T>(value, tClass));
        converts.add(new ConversorENUM<T>(value, tClass));
        converts.add(new ConversorNumerico<T>(value, tClass));
    }

    public static <T> T convert(Class<T> tClass, Object value) {
        return new Conversor<>(tClass, value).convert();
    }

    public T convert() {
        try {
            for (ConversorBase<T> convert: converts) {
                if (convert.validation())
                    return convert.convert();
            }

            return new ConversorPadrao<>(value, tClass).convert();
        } catch (Exception e) {}

        return null;
    }
}
