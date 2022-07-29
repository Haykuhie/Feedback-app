import axios from 'axios';
import { getFeedbackStream, postFeedback, getWaiters } from '../api';

describe('api calls', () => {
  describe('getFeedbackStream', () => {
    it('should be called with the correct arguments && return the correct data from the response', async () => {
      jest
        .spyOn(axios, 'get')
        .mockImplementation()
        .mockResolvedValue({
          data: {
            _embedded: {
              feedback_list: [
                {
                  full_name: 'Cynthia Young',
                  phone_number: '093828782',
                  email: 'cynthia.young@gmail.com',
                  score: 5,
                  comment: 'Comment',
                  waiter_id: 5,
                },
              ],
            },
          },
        });

      const response = await getFeedbackStream();

      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8000/list-feedback`,
        {
          params: { page: 1 },
        }
      );

      expect(response).toEqual({
        embedded: {
          feedbackList: [
            {
              fullName: 'Cynthia Young',
              phoneNumber: '093828782',
              email: 'cynthia.young@gmail.com',
              score: 5,
              comment: 'Comment',
              waiterId: 5,
            },
          ],
        },
      });
    });
  });

  describe('postFeedback', () => {
    it('should be called with the correct arguments', async () => {
      jest.spyOn(axios, 'post');

      await postFeedback({
        fullName: 'Cynthia Young',
        phoneNumber: '093828782',
        email: 'cynthia.young@gmail.com',
        score: 5,
        comment: 'Comment',
        waiterId: 5,
      });

      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8000/survey/create',
        {
          fullName: 'Cynthia Young',
          phoneNumber: '093828782',
          email: 'cynthia.young@gmail.com',
          score: 5,
          comment: 'Comment',
          waiterId: 5,
        }
      );
    });
  });

  describe('getWaiters', () => {
    it('should be called with the correct arguments && return the correct data from the response', async () => {
      jest
        .spyOn(axios, 'get')
        .mockImplementation()
        .mockResolvedValue({
          data: [
            {
              id: '1',
              name: 'Paul Barry',
            },
          ],
        });

      const response = await getWaiters();

      expect(axios.get).toHaveBeenCalledWith(
        `http://0.0.0.0:8000/survey/waiter`
      );

      expect(response).toEqual([
        {
          id: '1',
          name: 'Paul Barry',
        },
      ]);
    });
  });
});
