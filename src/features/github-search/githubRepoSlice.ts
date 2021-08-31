import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {GithubRepoResponse} from 'features/github-search/GithubInterface';
import {fetchRepos} from 'features/github-search/githubSearchAPI';
import {RootState} from 'app/store';

export interface GithubRepoState {
    repos: GithubRepoResponse,
    repoStatus: 'idle' | 'loading' | 'failed';
}

const initialState: GithubRepoState = {
    repos: {},
    repoStatus: 'idle',
};

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

export const githubRepoSlice = createSlice({
    name: 'githubRepos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchReposAction.pending, (state) => {
                state.repoStatus = 'loading';
            })
            .addCase(fetchReposAction.fulfilled, (state, action) => {
                const {username, repos} = action.payload;
                state.repoStatus = 'idle';
                state.repos[username] = repos;
            });
    },
});

export const selectRepos = (state: RootState) => state.githubRepo.repos;
export const selectRepoStatus = (state: RootState) => state.githubRepo.repoStatus;

export default githubRepoSlice.reducer;
