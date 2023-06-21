package com.bume.core.queryMapper;

public class QueryMapperException extends Exception {
    private String message;

    public QueryMapperException(String className, String column, String fieldOrMethod, String message) {
        super(message(className, column, fieldOrMethod, message));
    }

    private static String message(String className, String column, String fieldOrMethod, String message) {
        final String CLASS = "Class name: ".concat(className).concat("\n");
        final String COLUMN = "Column name: ".concat(column).concat("\n");
        final String FIELD_METHOD = "Field or method name: ".concat(fieldOrMethod).concat("\n");
        final String MESSAGE = "Message error: ".concat(message);

        return CLASS.concat(COLUMN).concat(FIELD_METHOD).concat(MESSAGE);
    }
}
