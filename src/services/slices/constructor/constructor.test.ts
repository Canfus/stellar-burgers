import { TIngredientItem } from '../../../utils/types';
import {
    initialState,
    addConstructorItem,
    deleteConstructorItem,
    clearConstructorItems,
    updateConstructorItems
} from './ConstructorItemsSlice';

import store from '../../store';

describe('Constructor Slice', () => {
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

    it('Should add ingredient', () => {
        const expectedValue = store.dispatch(addConstructorItem(ingredient));

        expect({ items: [expectedValue.payload] })
        .toEqual({ items: [...initialState.items, ingredient] });
    });

    it('Should delete ingredient', () => {
        store.dispatch(deleteConstructorItem(ingredient));
        expect({ items: [] })
        .toEqual({
            items: [
                ...initialState.items.filter(item => item._id !== ingredient._id)
            ]
        });
    });

    it('Should clear all ingredients', () => {
        store.dispatch(clearConstructorItems());
        expect({ items: [] })
        .toEqual(initialState);
    });

    it('Should update ingredients', () => {
        const expectedValue = store.dispatch(updateConstructorItems([ingredient]));

        expect({ items: expectedValue.payload })
        .toEqual({ items: [ingredient] });
    });
});