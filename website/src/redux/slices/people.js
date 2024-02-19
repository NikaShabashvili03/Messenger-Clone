import axios from '../../libs/axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import useCurrentUser from '../../hooks/useCurrentUser';



export const fetchPeople = createAsyncThunk('people/fetchPeople', async ({id}) => {
    const { data } = await axios.get(`/users/${id}`);

    return data;
})



const initialState = {
    people: {
        items: [],
        status: 'loading'
    }
}

const peopleSlice = createSlice({
    name: 'people',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchPeople.pending, (state) => {
            state.people.items = [];
            state.people.status = 'loading';
        });
        builder.addCase(fetchPeople.fulfilled, (state, action) => {
            state.people.items = action.payload;
            state.people.status = 'loaded';
        });
        builder.addCase(fetchPeople.rejected, (state) => {
            state.people.items = [];
            state.people.status = 'error';
        })
    }
})

export const peopleReducer = peopleSlice.reducer