import type { IPaginationProps } from './interfaces';
import styles from './styles/style.module.scss';

export function Pagination({ currentPage, totalPages, onPageChange }: IPaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.paginationButton}
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Предыдущая страница"
      >
        ←
      </button>
      {pages.map((page) => (
        <button
          key={page}
          type="button"
          className={`${styles.paginationButton} ${page === currentPage ? styles.paginationButton_active : ''}`}
          onClick={() => onPageChange(page)}
          aria-label={`Страница ${page}`}
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className={styles.paginationButton}
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Следующая страница"
      >
        →
      </button>
    </div>
  );
}
