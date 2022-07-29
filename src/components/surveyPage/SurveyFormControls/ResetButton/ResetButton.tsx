import styles from './ResetButton.module.css';

type Props = {
  resetButtonEnabled: boolean;
  onResetClick: () => void;
};

const ResetButton: React.FC<Props> = ({ resetButtonEnabled, onResetClick }) => {
  return (
    <button
      data-testid="resetButton"
      type="button"
      className={styles.resetButton}
      disabled={!resetButtonEnabled}
      onClick={onResetClick}
    >
      Reset
    </button>
  );
};

export default ResetButton;
