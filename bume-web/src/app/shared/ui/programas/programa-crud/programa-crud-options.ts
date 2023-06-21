import { Type } from '@angular/core';

export interface ProgramaCrudOptions {
    url?: string;
    pesquisa?: Type<any>;
    manutencao?: Type<any>;
    relatorio?: Type<any>;
}
