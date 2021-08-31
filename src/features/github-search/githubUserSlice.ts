import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'app/store';
import {fetchUsers} from 'features/github-search/githubSearchAPI';
import {GithubUser} from 'features/github-search/GithubInterface';

export interface GithubUserState {
    users: GithubUser[];
    total: 0;
    userStatus: 'idle' | 'loading' | 'failed';
    search: string;
}

const initialState: GithubUserState = {
    users: [],
    total: 0,
    userStatus: 'idle',
    search: '',
};

export const fetchUsersAction = createAsyncThunk(
    'github/fetchUsers',
    async (username: string) => {
        const response = await fetchUsers(username);
        // The value we return becomes the `fulfilled` action payload
        return response.data;
    }
);


export const githubUserSlice = createSlice({
    name: 'githubUsers',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersAction.pending, (state) => {
                state.userStatus = 'loading';
            })
            .addCase(fetchUsersAction.fulfilled, (state, action) => {
                state.userStatus = 'idle';
                state.users = action.payload.items;
                state.total = action.payload.items.length;
            })
    },
});

export const { setSearch } = githubUserSlice.actions;

export const selectUsers = (state: RootState) => state.githubUser;
export const selectUserStatus = (state: RootState) => state.githubUser.userStatus;
export const selectSearch = (state: RootState) => state.githubUser.search;

export default githubUserSlice.reducer;
