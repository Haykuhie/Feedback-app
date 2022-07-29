import create from 'zustand';
import { feedbackItem } from '../utils/types';

type ZustandStore = {
  feedbackList: feedbackItem[];
};

const useStore = create<any>((set) => ({
  feedbackList: [],
  setFeedbackList: (feedbackList: feedbackItem[]) => {
    set((state: ZustandStore) => ({
      feedbackList: [...state.feedbackList, ...feedbackList],
    }));
  },
  clearFeedbackList: () => {
    set(() => ({
      feedbackList: [],
    }));
  },
}));

export default useStore;
