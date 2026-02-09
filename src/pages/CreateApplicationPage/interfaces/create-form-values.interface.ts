import type { IParticipant } from '../../../features/entities/participant';
import type { IView } from '../../../features/entities/applications';

export interface ICreateFormValues {
  participant: IParticipant | null;
  view: IView | null;
  city: string;
  isCheck: boolean;
  needEnabled: boolean;
  need: string;
  searchEnabled: boolean;
  search: string;
}
