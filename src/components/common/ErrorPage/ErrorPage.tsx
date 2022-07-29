import styles from './ErrorPage.module.css';

const ErrorPage: React.FC = () => {
  return (
    <div className={styles.error}>Something went wrong, please try later!</div>
  );
};
export default ErrorPage;
