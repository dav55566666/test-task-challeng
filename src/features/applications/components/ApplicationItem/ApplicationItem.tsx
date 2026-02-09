import type { IApplicationItemProps } from './interfaces';
import { Text } from '../../../../core/uikit/Text';
import { ViewEnum } from '../../../entities/applications';
import styles from './styles/style.module.scss';

const VIEW_LABELS: Record<string, string> = {
  [ViewEnum.MY]: 'Моя',
  [ViewEnum.OTHER]: 'Чужая',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'Новая',
  in_progress: 'В работе',
  completed: 'Завершена',
  rejected: 'Отклонена',
};

export function ApplicationItem({ application, isShowStatus = false }: IApplicationItemProps) {
  const { participant, view, city, isCheck, need, search, status } = application;

  return (
    <article className={styles.item}>
      <div className={styles.row}>
        <span className={styles.participant}>{participant.name}</span>
        <span className={styles.meta}>
          {VIEW_LABELS[view.type]} · {city} · {isCheck ? 'Проверена' : 'Не проверена'}
        </span>
        {need != null && need !== '' && (
          <Text variant="caption">Нужно: {need}</Text>
        )}
        {search != null && search !== '' && (
          <Text variant="caption">Нужно: {search}</Text>
        )}
        {isShowStatus && status != null && (
          <span className={`${styles.status} ${styles[`status_${status}`]}`}>
            {STATUS_LABELS[status] ?? status}
          </span>
        )}
      </div>
    </article>
  );
}
