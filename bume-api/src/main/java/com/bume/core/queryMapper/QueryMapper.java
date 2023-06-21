package com.bume.core.queryMapper;

import org.hibernate.transform.Transformers;

import javax.persistence.Query;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;
import java.util.stream.Collectors;

public class QueryMapper {
    public static <T> Optional<T> getObjectDTO(Query query, Class<T> tClass) {
        List<Map<String, Object>> list = find(query);

        if (list.isEmpty())
            return Optional.empty();

        return getObjectDTO(list.stream().findFirst().get(), tClass);
    }

    public static <T> List<T> getListDTO(Query query, Class<T> tClass) {
        List<Map<String, Object>> list = find(query);
        List<T> toReturn = new ArrayList<>();

        for (Map<String, Object> row: list) {
            Optional<T> o = getObjectDTO(row, tClass);

            o.ifPresent(toReturn::add);
        }

        return toReturn;
    }

    private static List<Map<String, Object>> find(Query query) {
        return query.unwrap(org.hibernate.Query.class).setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP).list();
    }

    private static <T> Optional<T> getObjectDTO(Map<String, Object> item, Class<T> tClass) {
        try {
            Boolean isReturn;
            T o = tClass.getConstructor().newInstance();

            isReturn = forField(o, tClass, item);
            isReturn = forMethod(o, tClass, item, isReturn);

            if (isReturn)
                return Optional.of(o);
            else
                return Optional.empty();
        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    private static <T> Boolean forField(T o, Class<T> tClass, Map<String, Object> item) {
        boolean isReturn = false;

        try {
            List<Field> fields = Arrays.stream(tClass.getDeclaredFields()).filter(field -> field.isAnnotationPresent(CampoSQL.class)).collect(Collectors.toList());

            for (Field field : fields) {
                CampoSQL annotation = field.getAnnotation(CampoSQL.class);
                boolean accessible = field.isAccessible();
                String nameFieldSql;

                if (annotation.name().isEmpty())
                    nameFieldSql = field.getName().toLowerCase();
                else
                    nameFieldSql = annotation.name().toLowerCase();

                if (!item.containsKey(nameFieldSql))
                    continue;

                try {
                    field.setAccessible(true);
                    setFieldValue(field, o, nameFieldSql, item, tClass);

                    isReturn = true;
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    field.setAccessible(accessible);
                }
            }

            return isReturn;
        } catch (Exception e) {
            e.printStackTrace();
            return isReturn;
        }
    }

    private static <T> void setFieldValue(Field field, T o, String column, Map<String, Object> item, Class<T> tClass) throws QueryMapperException {
        try {
            field.set(o, getValue(field.getType(), item.get(column)));
        } catch (Exception e) {
            throw new QueryMapperException(
                    tClass.getName(),
                    column,
                    field.getName(),
                    Optional.ofNullable(e.getMessage()).orElse("Unknown error")
            );
        }
    }

    private static <T> Boolean forMethod(T o, Class<T> tClass, Map<String, Object> item, Boolean isReturnDefualt) {
        try {
            Boolean isReturn = isReturnDefualt;

            List<Method> methods = Arrays.stream(tClass.getDeclaredMethods())
                    .filter(method -> method.isAnnotationPresent(CampoSQL.class) && method.getParameterCount() == 1)
                    .collect(Collectors.toList());

            for (Method method: methods) {
                boolean accessible = method.isAccessible();
                Class<?> typeParameter = method.getParameterTypes()[0];
                CampoSQL annotation = method.getAnnotation(CampoSQL.class);
                String nameFieldSql;

                if (annotation.name().isEmpty())
                    nameFieldSql = method.getName().toUpperCase().replace("SET", "");
                else
                    nameFieldSql = annotation.name().toUpperCase();

                if (!item.containsKey(nameFieldSql))
                    continue;

                try {
                    method.setAccessible(true);
                    setParameterValue(method, o, typeParameter, nameFieldSql, item, tClass);

                    isReturn = true;
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    method.setAccessible(accessible);
                }
            }

            return isReturn;
        } catch (Exception e) {
            e.printStackTrace();
            return isReturnDefualt;
        }
    }

    private static <T> void setParameterValue(Method method, T o, Class<?> typeParameter, String column, Map<String, Object> item, Class<T> tClass) throws QueryMapperException {
        try {
            method.invoke(o, getValue(typeParameter, item.get(column)));
        } catch (Exception e) {
            throw new QueryMapperException(
                    tClass.getName(),
                    column,
                    method.getName(),
                    Optional.ofNullable(e.getMessage()).orElse("Unknown error")
            );
        }
    }

    private static <T> T getValue(Class<T> tClass, Object value) {
        return Conversor.convert(tClass, value);
    }
}
