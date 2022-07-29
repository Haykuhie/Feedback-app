import { useInfiniteQuery } from 'react-query';
import { useState, useRef, useCallback } from 'react';
import feedbackApi from '../api/getFeedbackssss';
import useStore from '../store/store';

type apiResponse = {
  _links: { next: { href: string } };
};

const getNextPage = (lastPage: apiResponse) => {
  let next;
  if (lastPage._links.next) {
    const start = +lastPage._links.next.href.indexOf('?page=') + 6;
    const end = +lastPage._links.next.href.indexOf('&per_page', start);
    next = +lastPage._links.next.href.slice(start, end);
  }
  return next;
};

const useFeedbackFlow = () => {
  const { getFeedbackList } = useStore();
  
  const { isLoading, isError, error, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery('feedbacks', ({ pageParam }) => feedbackApi(pageParam), {
      refetchOnWindowFocus: false,
      cacheTime: 0,
      getNextPageParam: (lastPage) => getNextPage(lastPage),
      onSuccess: (data) => {
        const newFeedbackData = [
          ...data.pages[data.pages.length - 1]._embedded.feedback_list,
        ];

        getFeedbackList(newFeedbackData);
      },
    });

  const observer = useRef<IntersectionObserver>();

  const lastItemRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(([el]) => {
        if (el.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasNextPage]
  );
  return {
    lastItemRef,
    isLoading,
    isFetching,
    isError,
    error,
  };
};
export default useFeedbackFlow;
