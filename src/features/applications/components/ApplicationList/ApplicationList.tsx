import type { IApplicationListProps } from './interfaces';
import { ApplicationItem } from '../ApplicationItem';
import { Text } from '../../../../core/uikit/Text';
import styles from './styles/style.module.scss';

export function ApplicationList({ applications, isShowStatus = false }: IApplicationListProps) {
  if (applications.length === 0) {
    return (
      <div className={styles.empty}>
        <Text variant="body">Заявок пока нет</Text>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {applications.map((application) => (
        <li key={application.id}>
          <ApplicationItem application={application} isShowStatus={isShowStatus} />
        </li>
      ))}
    </ul>
  );
}
