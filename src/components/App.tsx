import AppRouter from './AppRouter';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import styles from './App.module.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.background}>
        <AppRouter />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
};

export default App;
