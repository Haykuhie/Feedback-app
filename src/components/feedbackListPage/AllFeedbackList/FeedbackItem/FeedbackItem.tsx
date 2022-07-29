import styles from './FeedbackItem.module.css';
import ReactStarsRating from 'react-awesome-stars-rating';
import { dateFormatter, phoneNumberFormatter } from '../../../../utils/helpers';

type Props = {
  feedback: {
    timeCreated: string;
    fullName: string;
    phoneNumber: string;
    email: string;
    score: number;
    comment: string;
    id: string;
  };
};

const FeedbackItem: React.FC<Props> = ({ feedback }) => {
  return (
    <li className={styles.feedbackItem} data-testid={`feedback-${feedback.id}`}>
      <div className={styles.customerData}>
        <div className={`${styles.feedbackDate} ${styles.dataItem}`}>
          {dateFormatter(feedback.timeCreated)}
        </div>
        <div className={`${styles.customerName} ${styles.dataItem}`}>
          {feedback.fullName}
        </div>
        <div className={`${styles.phoneNumber} ${styles.dataItem}`}>
          {phoneNumberFormatter(feedback.phoneNumber)}
        </div>
        <div className={`${styles.emailAddress} ${styles.dataItem}`}>
          {feedback.email}
        </div>
        <div className={styles.stars}>
          <ReactStarsRating
            value={feedback.score}
            isHalf={false}
            primaryColor={'#ffd700'}
            size={25}
            isEdit={false}
          />
        </div>
      </div>
      <div className={styles.comment}>{feedback.comment}</div>
    </li>
  );
};
export default FeedbackItem;
