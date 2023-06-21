package com.bume.core.queryMapper;

import com.bume.core.queryMapper.ConversorBase;

import java.math.BigDecimal;
import java.util.Optional;

public class ConversorNumerico<T> extends ConversorBase<T> {
    protected ConversorNumerico(Object value, Class<T> tClass) {
        super(value, tClass);
    }

    @Override
    public T convert() {
        return convertToNumberByClass();
    }

    @Override
    public Boolean validation() {
        return Number.class.isAssignableFrom(tClass);
    }

    private T convertToNumberByClass() {
        if (!Optional.ofNullable(value).isPresent())
            return null;

        Number number = (Number) value;

        if (BigDecimal.class.equals(tClass))
            return tClass.cast(new BigDecimal(number.toString()));

        if (Integer.class.equals(tClass))
            return tClass.cast(number.intValue());

        if (Double.class.equals(tClass))
            return tClass.cast(number.doubleValue());

        if (Float.class.equals(tClass))
            return tClass.cast(number.floatValue());

        if (Long.class.equals(tClass))
            return tClass.cast(number.longValue());

        if (Short.class.equals(tClass))
            return tClass.cast(number.shortValue());

        return null;
    }
}
