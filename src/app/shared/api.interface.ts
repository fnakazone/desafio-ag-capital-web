export interface IApi<T> {
  data: T;
}

export interface IApiPaginate<T> {
  items: T;
  meta: IMeta;
}

export interface IApiPaginateUnidade<T> {
  data: { items: T };
  meta: IMeta;
}

export interface IApiPaginateAuditoria<T> {
  items: T;
  meta: IMetaAuditoria;
}

interface IMeta {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}

interface IMetaAuditoria {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  total: number;
  itemCount: number;
}
