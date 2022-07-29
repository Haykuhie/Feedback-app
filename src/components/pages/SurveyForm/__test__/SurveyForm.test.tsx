import SurveyForm from '../SurveyForm';
import { screen, fireEvent, cleanup } from '@testing-library/react';
import { render } from '../../../../utils/testProviders';
import '@testing-library/jest-dom';
import { FULL_NAME_ERROR } from '../../../../utils/constants';
import { postFeedback } from '../../../../api/api';

jest.mock('../../../../api/api', () => ({
  postFeedback: jest.fn(),
}));

describe('SurveyForm', () => {
  describe('SurveyForm Controls', () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    describe('Reset button', () => {
      it('should be disabled from the beginning', () => {
        render(<SurveyForm />);
        const resetBtn = screen.getByTestId('resetButton');
        expect(resetBtn).toBeDisabled();
      });
      it('Is becomes enabled when a value is entered in one of the input fields', () => {
        render(<SurveyForm />);
        const fullName = screen.getByTestId('fullName');
        const resetBtn = screen.getByTestId('resetButton');
        fireEvent.change(fullName, { target: { value: 'Test' } });
        expect(resetBtn).toBeEnabled();
      });
      it('Becomes disabled when the form is reset', () => {
        render(<SurveyForm />);
        const fullName = screen.getByTestId('fullName');
        const resetBtn = screen.getByTestId('resetButton');
        fireEvent.change(fullName, { target: { value: 'Test' } });
        fireEvent.click(resetBtn);
        expect(resetBtn).toBeDisabled();
      });
      it('Becomes disabled when the form is submitted', () => {
        render(<SurveyForm />);
        const fullName = screen.getByTestId('fullName');
        const phoneNumber = screen.getByTestId('phoneNumber');
        const email = screen.getByTestId('email');
        const rating = screen.getByTestId('ratingInputWrapper').lastChild?.firstChild?.firstChild;
        const resetBtn = screen.getByTestId('resetButton');
        const submitBtn = screen.getByTestId('submitBtn');
        fireEvent.change(fullName, { target: { value: 'Test' } });
        fireEvent.change(phoneNumber, { target: { value: '098001122' } });
        fireEvent.change(email, { target: { value: 'test@gmail.com' } });
        fireEvent.click(rating as HTMLElement);
        fireEvent.click(submitBtn);
        expect(resetBtn).toBeDisabled();
      });
    });

    describe('Submit button', () => {
      it('Is disabled from the beginning', () => {
        render(<SurveyForm />);
        const submitBtn = screen.getByTestId('submitBtn');
        expect(submitBtn).toBeDisabled();
      });
      it('Is disabled when an invalid input is entered', () => {
        render(<SurveyForm />);
        const fullName = screen.getByTestId('fullName');
        const phoneNumber = screen.getByTestId('phoneNumber');
        const email = screen.getByTestId('email');
        const rating = screen.getByTestId('ratingInputWrapper').lastChild?.firstChild?.firstChild;
        const submitBtn = screen.getByTestId('submitBtn');
        fireEvent.change(fullName, { target: { value: 'Test1' } }); // invalid input
        fireEvent.change(phoneNumber, { target: { value: '098001122' } });
        fireEvent.change(email, { target: { value: 'test@gmail.com' } });
        fireEvent.click(rating as HTMLElement);
        expect(submitBtn).toBeDisabled();
      });
      it('Becomes enabled when all the required input fields are filled with valid values', () => {
        render(<SurveyForm />);
        const fullName = screen.getByTestId('fullName');
        const phoneNumber = screen.getByTestId('phoneNumber');
        const email = screen.getByTestId('email');
        const rating = screen.getByTestId('ratingInputWrapper').lastChild?.firstChild?.firstChild;
        const submitBtn = screen.getByTestId('submitBtn');
        fireEvent.change(fullName, { target: { value: 'Test' } });
        fireEvent.change(phoneNumber, { target: { value: '098001122' } });
        fireEvent.change(email, { target: { value: 'test@gmail.com' } });
        fireEvent.click(rating as HTMLElement);
        expect(submitBtn).toBeEnabled();
      });
      it('Becomes disabled when the form is submitted', () => {
        render(<SurveyForm />);
        const fullName = screen.getByTestId('fullName');
        const phoneNumber = screen.getByTestId('phoneNumber');
        const email = screen.getByTestId('email');
        const rating = screen.getByTestId('ratingInputWrapper').lastChild?.firstChild?.firstChild;
        const submitBtn = screen.getByTestId('submitBtn');
        fireEvent.change(fullName, { target: { value: 'Test' } });
        fireEvent.change(phoneNumber, { target: { value: '098001122' } });
        fireEvent.change(email, { target: { value: 'test@gmail.com' } });
        fireEvent.click(rating as HTMLElement);
        fireEvent.click(submitBtn);
        expect(submitBtn).toBeDisabled();
      });
    });
  });

  describe('Input fields', () => {
    it('invalid input message is not shown from the beginning', () => {
      render(<SurveyForm />);
      const fullNameError = screen.getByTestId('fullNameError');
      expect(fullNameError).toHaveTextContent('');
    });
    it('invalid input message is not shown when the input field values are valid', () => {
      render(<SurveyForm />);
      const fullName = screen.getByTestId('fullName');
      const fullNameError = screen.getByTestId('fullNameError');
      const phoneNumber = screen.getByTestId('phoneNumber');
      const phoneNumberError = screen.getByTestId('phoneNumberError');
      const email = screen.getByTestId('email');
      const emailError = screen.getByTestId('emailError');
      fireEvent.change(fullName, { target: { value: 'Test' } });
      fireEvent.change(phoneNumber, { target: { value: '098001122' } });
      fireEvent.change(email, { target: { value: 'test@gmail.com' } });
      expect(fullNameError).toHaveTextContent(``);
      expect(phoneNumberError).toHaveTextContent(``);
      expect(emailError).toHaveTextContent(``);
    });
    it('invalid input message is shown when an invalid input is entered', () => {
      render(<SurveyForm />);
      const fullName = screen.getByTestId('fullName');
      const fullNameError = screen.getByTestId('fullNameError');
      fireEvent.change(fullName, { target: { value: 'Test1' } }); // invalid input
      expect(fullNameError).toHaveTextContent(`${FULL_NAME_ERROR}`);
    });
    it('input fields and validation error fields are empty after submit && submit handler function is invoked with right arguments', () => {
      render(<SurveyForm />);
      const fullName = screen.getByTestId('fullName');
      const fullNameError = screen.getByTestId('fullNameError');
      const phoneNumber = screen.getByTestId('phoneNumber');
      const phoneNumberError = screen.getByTestId('phoneNumberError');
      const email = screen.getByTestId('email');
      const emailError = screen.getByTestId('emailError');
      const rating = screen.getByTestId('ratingInputWrapper').lastChild?.firstChild?.firstChild;
      const submitBtn = screen.getByTestId('submitBtn');
      fireEvent.change(fullName, { target: { value: 'Test' } });
      fireEvent.change(phoneNumber, { target: { value: '098001122' } });
      fireEvent.change(email, { target: { value: 'test@gmail.com' } });
      fireEvent.click(rating as HTMLElement);
      fireEvent.click(submitBtn);
      expect(fullName).toHaveTextContent(``);
      expect(phoneNumber).toHaveTextContent(``);
      expect(email).toHaveTextContent(``);
      expect(fullNameError).toHaveTextContent(``);
      expect(phoneNumberError).toHaveTextContent(``);
      expect(emailError).toHaveTextContent(``);
      expect(postFeedback).toHaveBeenCalledWith({
        full_name: 'Test',
        phone_number: '098001122',
        email: 'test@gmail.com',
        score: 1,
        waiter_id: undefined,
        comment: '',
      });
    });
  });
});
