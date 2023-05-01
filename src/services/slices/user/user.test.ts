import {
    getUserData,
    initialState,
    login,
    logout,
    register,
    updateUser
} from './UserSlice';

import store from '../../store';

import {
    IUserResponse,
    TRegisterData,
    TLoginData,
    TUpdateUserData
} from '../../../utils/types';

describe('User slice', () => {
    const alpha = Array.from(Array(26)).map((_, index) => index + 65);
    const letters = alpha.map(index => String.fromCharCode(index).toLowerCase());

    const getRnd = () => {
        const rnd: string[] = [];
        for (let i = 0; i < 10; i++) {
            rnd.push(letters[Math.floor(Math.random() * letters.length)]);
        }
        return rnd.join('');
    }

    it('Should register', async () => {
        const mockUserData: TRegisterData = {
            email: `${getRnd()}@gmail.com`,
            name: getRnd(),
            password: getRnd()
        };

        await store.dispatch(register(mockUserData));

        expect(store.getState().userSlice)
            .toEqual({
                ...initialState,
                user: {
                    name: mockUserData.name,
                    email: mockUserData.email
                },
                isLoggedIn: true,
                status: 'ok'
            });
    });

    it('Should update user data', async () => {
        const mockUserData: TUpdateUserData = {
            email: `${getRnd()}@gmail.com`,
            name: getRnd(),
            password: getRnd()
        };

        await store.dispatch(updateUser(mockUserData));

        expect(store.getState().userSlice)
            .toEqual({
                ...initialState,
                user: {
                    email: mockUserData.email,
                    name: mockUserData.name
                },
                status: 'ok',
                isLoggedIn: true
            });
    });

    it('Should log in', async () => {
        const mockUserData: TLoginData = { email: 'canfus69@gmail.com', password: 'Cerfgthljkb123' };

        await store.dispatch(login(mockUserData));

        expect(store.getState().userSlice)
            .toEqual({
                ...initialState,
                user: {
                    name: 'Никита',
                    email: 'canfus69@gmail.com'
                },
                isLoggedIn: true,
                status: 'ok',

            });
    });

    it('Should get user data', async () => {
        await store.dispatch(getUserData());

        expect(store.getState().userSlice)
            .toEqual({
                ...initialState,
                user: {
                    name: 'Никита',
                    email: 'canfus69@gmail.com'
                },
                isLoggedIn: true,
                status: 'ok',

            });
    });

    it('Should log out', async () => {
        await store.dispatch(logout());

        expect(store.getState().userSlice)
            .toEqual({
                ...initialState,
                status: null,
                user: {
                    name: null,
                    email: null
                },
                error: null,
                isLoggedIn: false
            });

        expect(localStorage.getItem('accessToken')).toBeNull();
        expect(localStorage.getItem('refreshToken')).toBeNull();
    });
});

/*
    state.status = null;
    state.user.name = null;
    state.user.email = null;
    state.error = null;
    state.isLoggedIn = false;
    deleteItemLocalStorage('accessToken');
    deleteItemLocalStorage('refreshToken');
*/