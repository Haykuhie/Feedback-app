import styles from './BasicInput.module.css';
import { inputValueType } from '../../../utils/types';
import { useEffect, useState } from 'react';

type Props = {
  label: string;
  type: string;
  inputKey: inputValueType;
  isRequired: boolean;
  placeholder?: string;
  validator?: (value: string) => RegExpMatchArray | null;
  invalidInputMessage?: string;
  onValueChange: (
    updatedValue: { [Key in inputValueType]?: string },
    inputKey: inputValueType,
    valueIsValid: boolean
  ) => void;
  formResetStatus: boolean;
  customStyle?: string;
};

const BasicInput: React.FC<Props> = ({
  label,
  inputKey,
  type,
  isRequired,
  placeholder,
  validator,
  invalidInputMessage,
  onValueChange,
  formResetStatus,
  customStyle,
}) => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const valueIsValid = validator ? !!validator(enteredValue) : true;
  const hasError = !valueIsValid && isTouched;

  const handleChange = (event: any) => {
    setEnteredValue(event.currentTarget.value);
    setIsTouched(true);
  };

  const handleBlur = () => {
    setIsTouched(true);
  };

  useEffect(() => {
    if (enteredValue)
      onValueChange({ [inputKey]: enteredValue }, inputKey, valueIsValid);
  }, [enteredValue]);

  useEffect(() => {
    if (!!formResetStatus) {
      setEnteredValue('');
      setIsTouched(false);
    }
  }, [formResetStatus]);

  const inputClass = hasError
    ? `${styles.inputField} ${styles.invalidInput}`
    : `${styles.inputField}`;

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={inputKey}>
        {label} {isRequired && <span className={styles.required}>*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          data-testid={inputKey}
          className={`${inputClass} ${customStyle}`}
          value={enteredValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      ) : (
        <input
          data-testid={inputKey}
          className={`${inputClass} ${customStyle}`}
          type={type}
          value={enteredValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
        />
      )}
      <p
        className={styles.invalidInputMessage}
        data-testid={inputKey + 'Error'}
      >
        {hasError ? invalidInputMessage : ''}
      </p>
    </div>
  );
};

export default BasicInput;
