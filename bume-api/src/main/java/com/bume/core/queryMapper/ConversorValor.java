package com.bume.core.queryMapper;

import java.math.BigDecimal;

public class ConversorValor {

    public static BigDecimal convertToBigDecimal(Object o) {
        if (o instanceof BigDecimal)
            return (BigDecimal) o;
        else if (o instanceof  Double)
            return BigDecimal.valueOf((Double) o);
        else
            return null;
    }

    public static Integer convertToInteger(Object o) {
        if (o instanceof BigDecimal)
            return ((BigDecimal) o).intValue();
        else if (o instanceof  Integer)
            return (Integer) o;
        else
            return null;
    }

    public static Double convertToDouble(Object o) {
        if (o instanceof BigDecimal)
            return ((BigDecimal) o).doubleValue();
        else if (o instanceof  Double)
            return (Double) o;
        else
            return null;
    }

    public static Long convertToLong(Object o) {
        if (o instanceof BigDecimal)
            return ((BigDecimal) o).longValue();
        else if (o instanceof  Integer)
            return ((Integer) o).longValue();
        else if (o instanceof  Long)
            return (Long) o;
        else
            return null;
    }
}
