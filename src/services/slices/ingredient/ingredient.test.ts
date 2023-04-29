import {
    showIngredientInfo,
    closeIngredientInfo
} from './IngredientSlice';

import store from '../../store';

describe('Ingredient details modal slice', () => {
    it('Should open ingredient details modal', () => {
        store.dispatch(showIngredientInfo());

        expect({ status: 'visible' })
        .toEqual({ status: 'visible' });
    });

    it('Should close ingredient details modal', () => {
        store.dispatch(closeIngredientInfo());
        
        expect({ status: 'hidden' })
        .toEqual({ status: 'hidden' });
    });
});