import type { IApplication } from '../../../../entities/applications';

export interface IApplicationListProps {
  applications: IApplication[];
  isShowStatus?: boolean;
}
