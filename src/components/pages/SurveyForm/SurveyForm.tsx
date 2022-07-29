import WaiterSelectInput from '../../surveyPage/WaiterSelectInput';
import { useEffect, useState } from 'react';
import BasicInput from '../../common/BasicInput';
import RatingInput from '../../surveyPage/RatingInput';
import toast from 'react-hot-toast';
import SurveyFormControls from '../../surveyPage/SurveyFormControls';
import PageHeader from '../../common/PageHeader';
import { camelCaseToUnderscoreConverter } from '../../../utils/helpers';
import {
  fullNameValidator,
  phoneNumberValidator,
  emailValidator,
} from '../../../utils/validations';
import {
  FULL_NAME_ERROR,
  PHONE_NUMBER_ERROR,
  EMAIL_ERROR,
  DEFAULT_FIELDS_VALIDITY,
  DEFAULT_FIELDS_VALUES,
} from '../../../utils/constants';
import { postFeedback } from '../../../api/api';
import { inputValueType } from '../../../utils/types';
import styles from './SurveyForm.module.css';

const SurveyForm: React.FC = () => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [isResetEnabled, setIsResetEnabled] = useState<boolean>(false);
  const [resetButtonIsClicked, setResetButtonIsClicked] = useState<boolean>(false);
  const [fieldValues, setFieldValues] = useState(DEFAULT_FIELDS_VALUES);
  const [fieldsValidity, setFieldsValidity] = useState(DEFAULT_FIELDS_VALIDITY);

  const handleValueChange = (
    updatedValue: { [key: string]: string },
    inputKey: inputValueType,
    valueIsValid: boolean
  ) => {
    setIsResetEnabled(true);
    setResetButtonIsClicked(false);
    setFieldValues((prev) => {
      return { ...prev, ...updatedValue };
    });
    setFieldsValidity((prev) => {
      return { ...prev, ...{ [inputKey]: !!valueIsValid } };
    });
  };

  // useEffect(() => {
  //   console.log(fieldValues);     
  // }, [fieldValues]);

  const handleRatingChange = (ratingValue: { score: number }) => {
    setIsResetEnabled(true);
    setResetButtonIsClicked(false);
    setFieldValues({ ...fieldValues, ...ratingValue });
    setFieldsValidity((prev) => {
      return { ...prev, score: true };
    });
  };

  const handleWaiterSelect = (waiter: { waiterId?: any }) => {
    if (waiter.waiterId !== undefined) {
      setIsResetEnabled(true);
      setResetButtonIsClicked(false);
      setFieldValues({ ...fieldValues, ...waiter });
    }
  };

  const handleSubmit = () => {
    const formattedPostData = camelCaseToUnderscoreConverter(fieldValues);
    postFeedback(formattedPostData);
    handleReset();
  };

  const handleReset = () => {
    setIsResetEnabled(false);
    setResetButtonIsClicked(true);
    setFieldsValidity(DEFAULT_FIELDS_VALIDITY);
  };

  const validateForm = () => {
    if (Object.values(fieldsValidity).every((value) => value == true)) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    validateForm();
  }, [fieldsValidity]);

  return (
    <form className={styles.formWrapper}>
      <PageHeader pageTitle="Give your feedback" />
      <BasicInput
        label="Full Name"
        inputKey="fullName"
        type="text"
        isRequired={true}
        placeholder="Full Name"
        validator={fullNameValidator}
        onValueChange={handleValueChange}
        invalidInputMessage={FULL_NAME_ERROR}
        formResetStatus={resetButtonIsClicked}
      />
      <BasicInput
        label="Phone number"
        inputKey="phoneNumber"
        type="text"
        isRequired={true}
        placeholder="094 222 333"
        validator={phoneNumberValidator}
        onValueChange={handleValueChange}
        invalidInputMessage={PHONE_NUMBER_ERROR}
        formResetStatus={resetButtonIsClicked}
      />
      <BasicInput
        label="Email address"
        inputKey="email"
        type="text"
        isRequired={true}
        placeholder="john.doe@example.com"
        validator={emailValidator}
        onValueChange={handleValueChange}
        invalidInputMessage={EMAIL_ERROR}
        formResetStatus={resetButtonIsClicked}
      />
      <RatingInput
        onRatingChange={handleRatingChange}
        formResetStatus={resetButtonIsClicked}
      />
      <WaiterSelectInput
        onWaiterSelect={handleWaiterSelect}
        formResetStatus={resetButtonIsClicked}
      />
      <BasicInput
        label="Open text feedback"
        inputKey="comment"
        type="textarea"
        isRequired={false}
        onValueChange={handleValueChange}
        formResetStatus={resetButtonIsClicked}
        customStyle={styles.comment}
      />
      <SurveyFormControls
        onResetClick={handleReset}
        onSubmitButtonClick={handleSubmit}
        formIsValidCheck={isFormValid}
        resetButtonEnabled={isResetEnabled}
      />
    </form>
  );
};
export default SurveyForm;
