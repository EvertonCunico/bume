package com.bume.core;

import java.io.IOException;
import java.io.InputStream;

public class Properties {
    private static final String PROPERTIES_FILE = "application.properties";
    private static final java.util.Properties properties = new java.util.Properties();

    static {
        try (InputStream inputStream = Properties.class.getClassLoader().getResourceAsStream(PROPERTIES_FILE)) {
            properties.load(inputStream);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static String getProperty(String key) {
        return properties.getProperty(key);
    }

    private Properties() {
        throw new IllegalStateException("Utility class");
    }
}
