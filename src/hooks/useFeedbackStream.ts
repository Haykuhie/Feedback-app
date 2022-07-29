import { useInfiniteQuery } from 'react-query';
import { useState, useRef, useCallback, useEffect } from 'react';
import { getFeedbackStream } from '../api/api';
import useStore from '../store/store';

type ApiResponse = {
  links: { next: { href: string } };
};

const getNextPage = (lastPage: ApiResponse) => {
  let next;
  if (lastPage.links.next) {
    const start = +lastPage.links.next.href.indexOf('?page=') + 6;
    const end = +lastPage.links.next.href.indexOf('&per_page', start);
    next = +lastPage.links.next.href.slice(start, end);
  }
  return next;
};

const useFeedbackStream = () => {
  const { setFeedbackList, feedbackList } = useStore();
  //const [feedbackList, setFeedbackList] = useState<any>([]);
  const { isLoading, isError, hasNextPage, isFetching, fetchNextPage } =
    useInfiniteQuery(
      'feedbacks',
      ({ pageParam }) => getFeedbackStream(pageParam),
      {
        refetchOnWindowFocus: false,
        cacheTime: 0,
        getNextPageParam: (lastPage) => getNextPage(lastPage),
        onSuccess: (data) => {
          const newFeedbackData = [
            ...data.pages[data.pages.length - 1].embedded.feedbackList,
          ];
          setFeedbackList(newFeedbackData);
        },
      }
    );

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
    feedbackList,
    lastItemRef,
    isLoading,
    isFetching,
    isError,
  };
};
export default useFeedbackStream;
