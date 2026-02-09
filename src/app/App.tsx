import { AppNavigation, AppRouter } from './AppNavigation';
import '../core/styles/global.scss';
import styles from './styles/style.module.scss';

function App() {
  
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={`${styles.headerContainer} container`}>
          <AppNavigation />
        </div>
      </header>
      <main className={styles.page}>
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
