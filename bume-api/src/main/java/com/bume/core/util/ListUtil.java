package com.bume.core.util;

import java.util.List;

public class ListUtil {
    public static boolean isEmpty(List<?> t) {
        return t == null || t.isEmpty();
    }
    public static boolean isNotEmpty(List<?> t) {
        return !isEmpty(t);
    }
}
