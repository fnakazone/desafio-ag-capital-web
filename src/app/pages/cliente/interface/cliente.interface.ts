import { IProjeto } from "../../projeto/interface/projeto.interface";


export interface ICliente {
  id?: number;
  nome?: string;
  descricao?: string;
  projetos?: IProjeto[]
}
