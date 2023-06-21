import { OrigemPesquisa } from "./origem-pesquisa";

export interface RequisicaoPesquisa {
    url?: string;
    pagina?: number;
    id?: number;
    valor?: string;
    filtro?: any;
    origem?: OrigemPesquisa;
}
