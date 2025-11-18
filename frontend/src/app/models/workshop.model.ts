import { Workshop } from '../services/WorkshopsService';

export interface WorkshopTable {
  code: string;
  name: string;
  classes: string;
  original: Workshop;
}
