import type { IParticipant } from '../../participant';
import type { IView } from './view.interface';
import type { ApplicationStatusType } from '../types';

export interface IApplication {
  id: number;
  participant: IParticipant;
  view: IView;
  city: string;
  isCheck: boolean;
  need?: string;
  search?: string;
  status?: ApplicationStatusType;
}
