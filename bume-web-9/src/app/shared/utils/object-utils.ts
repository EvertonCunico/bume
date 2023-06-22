export class ObjetctUtils {

  public static getValorPropriedade(objeto, caminhoPropriedade) {
    return caminhoPropriedade.split('.').reduce((acc, part) => acc && acc[part], objeto);
  }

}

