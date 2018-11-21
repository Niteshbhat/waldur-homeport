import { OrderItemRequest } from '@waldur/marketplace/cart/types';
import { OrderItemResponse } from '@waldur/marketplace/orders/types';

import * as constants from './constants';

export const addItemRequest = (item: OrderItemRequest) => ({
  type: constants.ADD_ITEM_REQUEST,
  payload: {
    item,
  },
});

export const addItemSuccess = (item: OrderItemResponse) => ({
  type: constants.ADD_ITEM_SUCCESS,
  payload: {
    item,
  },
});

export const addItemError = () => ({
  type: constants.ADD_ITEM_ERROR,
});

export const removeItemRequest = (uuid: string) => ({
  type: constants.REMOVE_ITEM_REQUEST,
  payload: {
    uuid,
  },
});

export const removeItemSuccess = (uuid: string) => ({
  type: constants.REMOVE_ITEM_SUCCESS,
  payload: {
    uuid,
  },
});

export const removeItemError = () => ({
  type: constants.REMOVE_ITEM_ERROR,
});

export const setCart = cart => ({
  type: constants.SET_CART,
  payload: {
    cart,
  },
});

export const createOrderRequest = () => ({
  type: constants.CREATE_ORDER_REQUEST,
});

export const createOrderSuccess = () => ({
  type: constants.CREATE_ORDER_SUCCESS,
});

export const createOrderError = () => ({
  type: constants.CREATE_ORDER_ERROR,
});
