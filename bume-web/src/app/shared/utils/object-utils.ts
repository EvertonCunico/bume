export class ObjetctUtils {

  public static getValorPropriedade(objeto: any, caminhoPropriedade: any) {
    return caminhoPropriedade.split('.').reduce((acc: { [x: string]: any; }, part: string | number) => acc && acc[part], objeto);
  }

}

