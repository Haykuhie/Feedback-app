import styles from './SubmitButton.module.css';
import toast, { Toaster } from 'react-hot-toast';

type Props = {
  validForm: boolean;
  onSubmitClick: () => void;
};

const SubmitButton: React.FC<Props> = ({ validForm, onSubmitClick }) => {

  return (
    <button
      data-testid="submitBtn"
      type="button"
      className={styles.submitButton}
      disabled={!validForm}
      onClick={onSubmitClick}
    >
      Submit
    </button>
  );
};

export default SubmitButton;
