import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import githubUserReducer from 'features/github-search/githubUserSlice';
import githubRepoReducer from 'features/github-search/githubRepoSlice';

export const store = configureStore({
    reducer: {
        githubUser: githubUserReducer,
        githubRepo: githubRepoReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
