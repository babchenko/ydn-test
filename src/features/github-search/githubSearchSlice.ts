import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchUsers, fetchRepos } from './githubSearchAPI';
import { GithubUser, GithubRepoResponse } from "./GithubInterface";

export interface GithubState {
    users: GithubUser[];
    repos: GithubRepoResponse,
    total: 0;
    userStatus: 'idle' | 'loading' | 'failed';
    repoStatus: 'idle' | 'loading' | 'failed';
}

const initialState: GithubState = {
    users: [],
    repos: {},
    total: 0,
    userStatus: 'idle',
    repoStatus: 'idle',
};

export const fetchUsersAction = createAsyncThunk(
    'github/fetchUsers',
    async (username: string) => {
        const response = await fetchUsers(username);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);

export const fetchReposAction = createAsyncThunk(
    'github/fetchRepos',
    async (username: string) => {
        const response = await fetchRepos(username);
        return {
            username,
            repos: response.data
        }
    }
)


export const githubSlice = createSlice({
    name: 'github',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersAction.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(fetchReposAction.pending, (state) => {
                state.repoStatus = 'loading';
            })
            .addCase(fetchUsersAction.fulfilled, (state, action) => {
                state.userStatus = 'idle';
                state.users = action.payload.items;
                state.total = action.payload.items.length;
            })
            .addCase(fetchReposAction.fulfilled, (state, action) => {
                const { username, repos } = action.payload;
                state.repoStatus = 'idle';
                state.repos[username] = repos;
            });
    },
});

export const selectRepos = (state: RootState) => state.github.repos;
export const selectUsers = (state: RootState) => state.github;
export const selectUserStatus = (state: RootState) => state.github.userStatus;
export const selectRepoStatus = (state: RootState) => state.github.repoStatus;

export default githubSlice.reducer;
