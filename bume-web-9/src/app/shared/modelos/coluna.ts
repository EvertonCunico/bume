import { TiposCampo } from './tipos-campo';

export interface Coluna {
    field: string;
    header: string;
    tipo?: TiposCampo;
    mascara?: string;
    propriedade?: string;
    propriedades?: string[];
    opcoes?: any;
    subField?: string;
}
