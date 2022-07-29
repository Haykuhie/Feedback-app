export const DEFAULT_FIELDS_VALIDITY = {
  fullName: false,
  phoneNumber: false,
  email: false,
  score: false,
  comment: true,
};
export const DEFAULT_FIELDS_VALUES = {
  fullName: '',
  phoneNumber: '',
  email: '',
  score: 0,
  waiterId: undefined,
  comment: '',
};

export const FULL_NAME_ERROR: string =
  "Full name can't be blank or have other characters than letters";
export const PHONE_NUMBER_ERROR: string =
  "Phone number can't be blank or have other characters than numbers";
export const EMAIL_ERROR: string = 'Please enter a valid email address';
export const NAV_PAGES = [
  {
    to: '/survey',
    content: 'Survey',
  },
  {
    to: '/feedback',
    content: 'Feedback List',
  },
];
