import AllFeedbackList from '../AllFeedbackList';
import useFeedbackStream from '../../../../hooks/useFeedbackStream';
import { screen } from '@testing-library/react';
import { mockFeedbackList } from '../../../../utils/mockFeedbackList';
import { render } from '../../../../utils/testProviders';
import { createMock } from 'ts-jest-mock';

jest.mock('../../../../hooks/useFeedbackStream');
const mockedFeedbackList = createMock(useFeedbackStream);

describe('AllFeebackList page when receiving feedback list data, while loading and fwtching the data', () => {
  it('should render all the feedback items that has received', () => {
    mockedFeedbackList.mockReturnValue({
      feedbackList: mockFeedbackList,
      lastItemRef: jest.fn(),
      isLoading: false,
      isFetching: false,
      isError: false,
    });
    render(<AllFeedbackList />);
    mockFeedbackList.forEach(({ id }) => {
      expect(screen.getByTestId(`feedback-${id}`)).toBeInTheDocument();
    });
  });

  it('should render loading spinner component when the page is loading', () => {
    mockedFeedbackList.mockReturnValue({
      feedbackList: [],
      lastItemRef: jest.fn(),
      isLoading: true,
      isFetching: false,
      isError: false,
    });

    render(<AllFeedbackList />);
    const loadingSpinner = screen.getByTestId('loadingSpinner');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('should render fetching spinner component when the page is fetching', () => {
    mockedFeedbackList.mockReturnValue({
      feedbackList: [],
      lastItemRef: jest.fn(),
      isLoading: false,
      isFetching: true,
      isError: false,
    });
    render(<AllFeedbackList />);
    const fetchingSpinner = screen.getByTestId('fetchingSpinner');
    expect(fetchingSpinner).toBeInTheDocument();
  });
});
