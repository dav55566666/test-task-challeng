import { useState, useMemo } from 'react';
import { useGetApplicationsQuery } from '../../features/store';
import { ApplicationList } from '../../features/applications';
import { Input, Pagination } from '../../core/uikit';
import styles from './styles/style.module.scss';

const ITEMS_PER_PAGE = 6;

export function ApplicationStatusPage() {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: applications = [], isLoading, error } = useGetApplicationsQuery();

  const filtered = useMemo(() => {
    if (!search.trim()) return applications;
    const q = search.toLowerCase();
    return applications.filter(
      (a) =>
        a.participant.name.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q)
    );
  }, [applications, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, currentPage]);

  if (isLoading) return <div className={styles.placeholder}>Загрузка...</div>;
  if (error) return <div className={styles.placeholder}>Ошибка загрузки</div>;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.searchRow}>
          <Input
            placeholder="Поиск по имени или городу..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className={styles.searchInput}
          />
        </div>
        <ApplicationList applications={paginated} isShowStatus />
        {filtered.length > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}
