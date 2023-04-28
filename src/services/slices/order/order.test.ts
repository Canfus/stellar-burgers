import {
    initialState,
    setOrders
} from './OrderSlice';

import store from '../../store';

import { IOrderListResponse } from '../../../utils/types';

describe('Order slice', () => {
    const order: IOrderListResponse = {
        success: true,
        orders: [{
            _id: '644ae1d945c6f2001be6e2f2',
            ingredients: [
                '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный бургер',
            createdAt: '2023-04-27T20:58:01.629Z',
            updatedAt: '2023-04-27T20:58:01.663Z',
            number: 1909
        }],
        total: 1535,
        totalToday: 254
    }

    it('Should set orders', () => {
        const expectedValue = store.dispatch(setOrders(order));

        expect({
            ...initialState,
            orders: expectedValue.payload.orders,
            total: expectedValue.payload.total,
            totalToday: expectedValue.payload.totalToday

        })
        .toEqual({
            ...initialState,
            orders: order.orders,
            total: order.total,
            totalToday: order.totalToday
        });
    });
});