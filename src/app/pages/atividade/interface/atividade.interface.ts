import { IStatusAtividade } from "../../interface/status-atividade.interface";
import { IProjeto } from "../../projeto/interface/projeto.interface";

export interface IAtividade {
  id?: number;
  nome: string;
  descricao?: string;
  projeto?:  IProjeto;
  status?: IStatusAtividade;
}
