package com.bume.core.queryMapper;

public abstract class ConversorBase<T> {

    protected final Object value;
    protected final Class<T> tClass;

    protected ConversorBase(Object value, Class<T> tClass) {
        this.value = value;
        this.tClass = tClass;
    }

    public abstract T convert();
    public abstract Boolean validation();
}
