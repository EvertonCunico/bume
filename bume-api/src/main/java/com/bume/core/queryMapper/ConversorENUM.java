package com.bume.core.queryMapper;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class ConversorENUM<T> extends ConversorBase<T> {
    protected ConversorENUM(Object value, Class<T> tClass) {
        super(value, tClass);
    }

    @Override
    public T convert() {
        return convertToEnum();
    }

    @Override
    public Boolean validation() {
        return tClass.isEnum();
    }

    private T convertToEnum() {
        if (!Optional.ofNullable(value).isPresent())
            return null;

        List<Enum<?>> enumList = (List<Enum<?>>) Arrays.asList(tClass.getEnumConstants());

        Optional<T> valueEnum = convertToEnumByName(enumList);

        if (!valueEnum.isPresent())
            valueEnum = convertToEnumByOrdinal(enumList);

        return valueEnum.get();
    }

    private Optional<T> convertToEnumByName(List<Enum<?>> enumList) {
        for (Enum<?> e: enumList) {
            if (value.toString().trim().equals(e.name()))
                return Optional.ofNullable((T) e);
        }

        return Optional.empty();
    }

    private Optional<T> convertToEnumByOrdinal(List<Enum<?>> enumList) {
        try {
            Integer ordinal = ((Number) value).intValue();

            for (Enum<?> e: enumList) {
                if (ordinal.equals(e.ordinal()))
                    return Optional.ofNullable((T) e);
            }
        } catch (Exception e) {}

        return Optional.empty();
    }
}
