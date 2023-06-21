package com.bume.core.queryMapper;

public class ConversorObject<T> extends ConversorBase<T> {
    protected ConversorObject(Object value, Class<T> aClass) {
        super(value, aClass);
    }

    @Override
    public T convert() {
        return tClass.cast(value);
    }

    @Override
    public Boolean validation() {
        return Object.class.equals(tClass);
    }
}
