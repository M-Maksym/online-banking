import { createSlice } from "@reduxjs/toolkit";

export const historySlice = createSlice({
    name: 'history',
    initialState: {
        history: 
        JSON.parse(localStorage.getItem('history')) || [],
        amount: 0,
        totalAmount: 
        JSON.parse(localStorage.getItem('totalAmount')) || 0,
    },
    reducers:{
        addToHistory(state, action){
            const image = action.payload;
            try{
                state.history.push({
                    amount: 1,
                    url: image.url,
                    text: image.text,
                    date: image.date,
                })
                state.totalAmount++;
                console.log(state.history);
                const saveState = JSON.stringify(state.history);
                localStorage.setItem('history', saveState);
                const saveTotal = JSON.stringify(state.totalAmount);
                localStorage.setItem('totalAmount', saveTotal);
                console.log('session:'+saveState+saveTotal);
            }catch(err){
                return err;
            }
        }
    }
})

export const {addToHistory} = historySlice.actions;
export default historySlice.reducer;