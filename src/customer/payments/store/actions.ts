import { Payment } from '@waldur/workspace/types';

import * as constants from '../constants';

export const createPayment = (payload: {
  formData: Payment;
  profile_url: string;
}) => ({
  type: constants.CREATE_PAYMENT,
  payload: payload,
});

export const updatePayment = (uuid: string, formData: Payment) => ({
  type: constants.UPDATE_PAYMENT,
  payload: {
    uuid: uuid,
    formData: formData,
  },
});

export const deletePayment = (uuid: string) => ({
  type: constants.DELETE_PAYMENT,
  payload: uuid,
});