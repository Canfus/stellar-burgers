import {
    initialState,
    setIngredientsItems,
    error
} from './IngredientsItemsSlice';

import store from '../../store';

import { TIngredientItem } from '../../../utils/types';

describe('Ingredients slice', () => {
    const ingredient: TIngredientItem = {
        dragId: "c38fda8d-34f3-35f8-7b47-364de766952e",
        _id: "643d69a5c3f7b9001cfa093d",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0
    };

    it('Should set all ingredients', () => {
        const expectedValue = store.dispatch(setIngredientsItems([ingredient]));

        expect({
            status: 'ok',
            error: null,
            items: expectedValue.payload
        })
        .toEqual({
            ...initialState,
            status: 'ok',
            items: [ingredient]
        })
    });

    it('Should set error message', () => {
        const errorMessage: string = 'Fatal error';

        expect({
            ...initialState,
            status: 'error',
            error: store.dispatch(error(errorMessage)).payload
        })
        .toEqual({
            ...initialState,
            status: 'error',
            error: errorMessage
        })
    });
});