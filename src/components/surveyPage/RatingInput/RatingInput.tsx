import ReactStarsRating from 'react-awesome-stars-rating';
import { useState, useEffect } from 'react';
import styles from './RatingInput.module.css';

type Props = {
  formResetStatus: boolean;
  onRatingChange: (ratingValue:{'score' : number}) => void;
};

const RatingInput: React.FC<Props> = ({ formResetStatus, onRatingChange }) => {
  const [stars, setStars] = useState(0);

  const ratingChangeHandler = (value: number) => {
    setStars(value);
    onRatingChange({ 'score' : value });
  };

  useEffect(() => {
    if (!!formResetStatus) setStars(0);
  }, [formResetStatus]);

  return (
    <div className={styles.inputWrapper} data-testid="ratingInputWrapper">
      <p>
        Rate your satisfaction <span className={styles.required}>*</span>
      </p>
      <ReactStarsRating
        onChange={ratingChangeHandler}
        value={stars}
        isHalf={false}
        primaryColor={'#ffd700'}
        size={27}
      />
    </div>
  );
};
export default RatingInput;
