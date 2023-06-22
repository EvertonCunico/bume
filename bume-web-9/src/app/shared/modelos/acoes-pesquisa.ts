/**
 * Configurações das ações do componente de pesquisa
 */
export interface AcoesPesquisa {

    /**
     * Visualização de registro - Adiciona botão de visualizar nos registros da tabela de resultados, não é usada se editar = true
     */
    visualizar?: boolean;

    /**
     * Inclusão de registro - Exibe o botão de incluir que abre a tela de manutenção para criação de um novo registro
     */
    incluir?: boolean;

    /**
     * 
     */
    editar?: boolean;

    /**
     * 
     */
    filtrar?: boolean;

    /**
     * 
     */
     acao1?: boolean;

    pesquisar?: boolean;
}
