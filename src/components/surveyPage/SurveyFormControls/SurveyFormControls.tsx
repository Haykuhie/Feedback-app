import SubmitButton from './SubmitButton';
import ResetButton from './ResetButton';
import styles from './SurveyFormControls.module.css';

type Props = {
  formIsValidCheck: boolean;
  resetButtonEnabled: boolean;
  onResetClick: () => void;
  onSubmitButtonClick: () => void;
};

const SurveyFormControls: React.FC<Props> = ({
  formIsValidCheck,
  resetButtonEnabled,
  onResetClick,
  onSubmitButtonClick,
}) => {
  return (
    <div className={styles.buttonsFlex}>
      <ResetButton
        resetButtonEnabled={resetButtonEnabled}
        onResetClick={onResetClick}
      />
      <SubmitButton
        validForm={formIsValidCheck}
        onSubmitClick={onSubmitButtonClick}
      />
    </div>
  );
};

export default SurveyFormControls;
