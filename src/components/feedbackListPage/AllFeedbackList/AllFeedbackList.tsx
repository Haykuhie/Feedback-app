import styles from './AllFeedbackList.module.css';
import { SpinnerCircular } from 'spinners-react';
import ErrorPage from '../../common/ErrorPage';
import FeedbackItem from './FeedbackItem';
import PageHeader from '../../common/PageHeader';
import useFeedbackStream from '../../../hooks/useFeedbackStream';
import useStore from '../../../store/store';
import { useEffect } from 'react';

const AllFeedbackList = () => {
  const { lastItemRef, isLoading, isFetching, isError, feedbackList } =
    useFeedbackStream();
  const { clearFeedbackList } = useStore();

  useEffect(() => {
    clearFeedbackList();
  }, []);

  if (isLoading)
    return (
      <div className={styles.loadSpinner} data-testid="loadingSpinner">
        <SpinnerCircular
          secondaryColor="#cfcfcf"
          color="rgb(8, 6, 119)"
          size={100}
        />
      </div>
    );

  if (isError) {
    return <ErrorPage />;
    // toast.error('Something went wrong!', { position: 'top-right' });
  }

  return (
    <>
      <PageHeader
        pageTitle="Feedback list"
        customStyle={styles.customHeaderStyle}
      />
      <div className={styles.feedbackUl}>
        <ul>
          {feedbackList.map((feedback: any, index: number) =>
            index === feedbackList.length - 1 ? (
              <div ref={lastItemRef} key={feedback.id}>
                <FeedbackItem feedback={feedback} />
              </div>
            ) : (
              <div key={feedback.id}>
                <FeedbackItem feedback={feedback} />
              </div>
            )
          )}
        </ul>
      </div>
      <div className={styles.fetchSpinner}>
        <div className={styles.fetchSpinnerContainer}>
          {isFetching && (
            <div data-testid="fetchingSpinner">
              <SpinnerCircular
                secondaryColor="#cfcfcf"
                color="rgb(8, 6, 119)"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllFeedbackList;
