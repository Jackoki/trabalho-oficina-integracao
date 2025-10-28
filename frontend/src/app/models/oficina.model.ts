import { Workshop } from '../services/WorkshopsService';

export interface OficinaTabela {
  codigo: string;
  nome: string;
  aulas: string;
  original: Workshop;
}
