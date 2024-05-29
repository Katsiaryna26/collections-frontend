import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async(params)=>{
    const {data} =await axios.post('/auth/login', params);
    return data;
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async(params)=>{
    const {data} =await axios.post('/auth/register', params);
    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async()=>{
    const {data} =await axios.post('/auth/me');
    return data;
})

const initialState={
    data:null,
    status: 'loading',
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=>{
            state.data = null;
        }
    },
    extraReducers:{
        [fetchAuth.pending]: (state)=>{//выполняется загрузка
            state.status ='loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action)=>{//запрос выполнился успешно
            state.status ='loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state)=>{//ошибка
            state.status ='error';
            state.data = null;
        },

        [fetchAuthMe.pending]: (state)=>{//выполняется загрузка
            state.status ='loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, action)=>{//запрос выполнился успешно
            state.status ='loaded';
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]: (state)=>{//ошибка
            state.status ='error';
            state.data = null;
        },


        [fetchRegister.pending]: (state)=>{//выполняется загрузка
            state.status ='loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state, action)=>{//запрос выполнился успешно
            state.status ='loaded';
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state)=>{//ошибка
            state.status ='error';
            state.data = null;
        },
    }
});

export const selectIsAuth = (state)=>Boolean(state.auth.date);

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;