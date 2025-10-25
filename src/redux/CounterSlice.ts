import {createSlice} from '@reduxjs/toolkit';
import {type Product } from '../types';

type CartState = {
    items: Product[]
}
const initialState: CartState  = {
    items: []
};


export const cartSlice = createSlice({
   name: 'cart',
   initialState: initialState,

   reducers: {
    addToCart: (state, action) => {
        const existsCart = state.items.find((p => p.id === action.payload.id));
        if(!existsCart){
            state.items.push(action.payload);
        }
    },
    removeFromCart: (state, action) => {
         state.items = state.items.filter(p => p.id !== action.payload);
        
         
    },
    clearCart: (state) => {
        state.items = []
    }
   },

  
   
});

export const {addToCart, removeFromCart,clearCart } = cartSlice.actions;

export default cartSlice.reducer