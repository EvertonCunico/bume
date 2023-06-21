package com.bume;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class Paginacao<T> {
    private Integer pageNumber;
    private Integer pageSize;
    private Integer lastPage;
    private Long totalRows;
    private List<T> data = new ArrayList();
}
