package com.bume.core.queryMapper;

public class ConversorPadrao<T> extends ConversorBase<T> {

    protected ConversorPadrao(Object value, Class<T> tClass) {
        super(value, tClass);
    }

    @Override
    public T convert() {
        return tClass.cast(value);
    }

    @Override
    public Boolean validation() {
        return true;
    }
}
