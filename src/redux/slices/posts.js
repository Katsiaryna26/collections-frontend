import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async()=>{
    const {data} =await axios.get('/posts');
    return data;
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async()=>{
    const {data} =await axios.get('/tags');
    return data;
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async(id)=>{
    await axios.delete(`/posts/${id}`);
    
})


const initialState={
    posts: {
        items: [],
        status:'loading',
    },
    tags: {
        items:[],
        status:'loading'
    },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{},
    extraReducers:{
        [fetchPosts.pending]: (state)=>{//выполняется загрузка
            state.posts.items=[];
            state.posts.status ='loading';
        },
        [fetchPosts.fulfilled]: (state, action)=>{//запрос выполнился успешно
            state.posts.items = action.payload;
            state.posts.status ='loaded';
        },
        [fetchPosts.rejected]: (state)=>{//ошибка
            state.posts.items=[];
            state.posts.status ='error';
        },

        [fetchTags.pending]: (state)=>{//выполняется загрузка
            state.tags.items=[];
            state.tags.status ='loading';
        },
        [fetchTags.fulfilled]: (state, action)=>{//запрос выполнился успешно
            state.tags.items = action.payload;
            state.tags.status ='loaded';
        },
        [fetchTags.rejected]: (state)=>{//ошибка
            state.tags.items=[];
            state.tags.status ='error';
        },

        [fetchRemovePost.pending]: (state, action)=>{
            state.posts.items=state.posts.items.filter(obj => obj._id !== action.meta.arg)   
        },
    },
});

export const postsReducer = postsSlice.reducer;