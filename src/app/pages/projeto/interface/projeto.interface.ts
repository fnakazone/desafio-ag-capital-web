import { IAtividade } from "../../atividade/interface/atividade.interface";
import { ICliente } from "../../cliente/interface/cliente.interface";
import { IStatusProjeto } from "../../interface/status-projeto.interface";

export interface IProjeto {
  id?: number;
  nome?: string;
  descricao?: string;
  status?: IStatusProjeto;
  cliente?: ICliente;
  atividades?: IAtividade[];
}

