export type feedbackItem = {
    fullName: string,
    phoneNumber: string,
    emailAddress: string,
    rating: number,
    waiter: string,
    comment: string
}
export type inputValueType =
  | 'fullName'
  | 'phoneNumber'
  | 'email'
  | 'score'
  | 'waiter'
  | 'comment';
