import styles from './PageHeader.module.css';

type Props = {
  pageTitle: string;
  customStyle?: string;
};

const PageHeader: React.FC<Props> = ({ pageTitle, customStyle }) => {
  return <h1 className={`${styles.header} ${customStyle}`}>{pageTitle}</h1>;
};

export default PageHeader;
