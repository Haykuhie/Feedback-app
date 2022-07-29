import React from 'react';
import styles from './FeedbackList.module.css';
import PageHeader from '../../common/PageHeader';
import AllFeedbackList from '../../feedbackListPage/AllFeedbackList';

const FeedbackList: React.FC = () => (
  <div className={styles.header}>
    <PageHeader pageTitle='Feedback List'/>
      <AllFeedbackList />
  </div>
);

export default FeedbackList;
