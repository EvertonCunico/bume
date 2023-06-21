package com.bume.core.util;

public class StringUtil {

    public static boolean isEmpty(String s) { return s == null || s.isEmpty() || s.isBlank(); }

    public static boolean isNotEmpty(String s) { return !isEmpty(s); }
}
