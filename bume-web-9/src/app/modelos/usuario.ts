import { Modelo } from '@boom/modelos/modelo';
import { RolesUser } from './roles';

export class Usuario extends Modelo {
    nome: string;
    cpf?: string;
    rg?: string;
    dataNascimento?: Date;
    email?: string;
    telefoneCelular?: string;
    login?: string;
    senha?: string;
    ativo?: boolean;
    tipoAcesso?: RolesUser;
}