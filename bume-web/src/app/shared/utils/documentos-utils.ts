export class DocumentostUtils {

    public static validarCPF(cpf: string): boolean {
        // tslint:disable-next-line: triple-equals
        if (cpf.length != 11) {
            return false;
        }
        // tslint:disable-next-line: max-line-length tslint:disable-next-line: triple-equals
        if ((cpf == '00000000000') || (cpf == '11111111111') || (cpf == '22222222222') || (cpf == '33333333333') || (cpf == '44444444444') || (cpf == '55555555555') || (cpf == '66666666666') || (cpf == '77777777777') || (cpf == '88888888888') || (cpf == '99999999999')) {
            return false;
        }
        let numero = 0;
        let caracter = '';
        const numeros = '0123456789';
        let j = 10;
        let somatorio = 0;
        let resto = 0;
        let digito1 = 0;
        let digito2 = 0;
        let cpfAux = '';
        cpfAux = cpf.substring(0, 9);
        for (let i = 0; i < 9; i++) {
            caracter = cpfAux.charAt(i);
            // tslint:disable-next-line: triple-equals
            if (numeros.search(caracter) == -1) {
                return false;
            }
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito1 = 11 - resto;
        if (digito1 > 9) {
            digito1 = 0;
        }
        j = 11;
        somatorio = 0;
        cpfAux = cpfAux + digito1;
        for (let i = 0; i < 10; i++) {
            caracter = cpfAux.charAt(i);
            numero = Number(caracter);
            somatorio = somatorio + (numero * j);
            j--;
        }
        resto = somatorio % 11;
        digito2 = 11 - resto;
        if (digito2 > 9) {
            digito2 = 0;
        }
        cpfAux = cpfAux + digito2;
        // tslint:disable-next-line: triple-equals
        if (cpf != cpfAux) {
            return false;
        } else {
            return true;
        }
    }

    public static validarCNPJ(value: any): boolean {
        if (!value) return false
        // Aceita receber o valor como string, número ou array com todos os dígitos
        const isString = typeof value === 'string'
        const validTypes = isString || Number.isInteger(value) || Array.isArray(value)
        // Elimina valor em formato inválido
        if (!validTypes) return false
        // Filtro inicial para entradas do tipo string
        if (isString) {
          // Limita ao máximo de 18 caracteres, para CNPJ formatado
          if (value.length > 18) return false
          // Teste Regex para veificar se é uma string apenas dígitos válida
          const digitsOnly = /^\d{14}$/.test(value)
          // Teste Regex para verificar se é uma string formatada válida
          const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)
          // Se o formato é válido, usa um truque para seguir o fluxo da validação
          if (digitsOnly || validFormat) true
          // Se não, retorna inválido
          else return false
        }
        // Guarda um array com todos os dígitos do valor
        const match = value.toString().match(/\d/g)
        const numbers = Array.isArray(match) ? match.map(Number) : []
        // Valida a quantidade de dígitos
        if (numbers.length !== 14) return false
        // Elimina inválidos com todos os dígitos iguais
        const items = [...new Set(numbers)]
        if (items.length === 1) return false
        // Cálculo validador
        const calc = (x) => {
          const slice = numbers.slice(0, x)
          let factor = x - 7
          let sum = 0
          for (let i = x; i >= 1; i--) {
            const n = slice[x - i]
            sum += n * factor--
            if (factor < 2) factor = 9
          }
          const result = 11 - (sum % 11)
          return result > 9 ? 0 : result
        }
        // Separa os 2 últimos dígitos de verificadores
        const digits = numbers.slice(12)
        // Valida 1o. dígito verificador
        const digit0 = calc(12)
        if (digit0 !== digits[0]) return false
        // Valida 2o. dígito verificador
        const digit1 = calc(13)
        return digit1 === digits[1]        
    }
}