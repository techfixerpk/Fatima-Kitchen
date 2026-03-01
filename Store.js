import { configureStore, createSlice, combineReducers } from '@reduxjs/toolkit';

/**
 * REDUX STORE - THE CENTRAL NERVOUS SYSTEM
 * Features: Persisted State, Cart Intelligence, and Real-time Discount Calculation.
 */

// --- 1. CART SLICE (Managing the Royal Orders) ---
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    appliedVoucher: null,
    finalAmount: 0
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      // Recalculate discount if voucher exists
      state.finalAmount = state.appliedVoucher ? calculateDiscount(state.totalAmount, state.appliedVoucher) : state.totalAmount;
    },

    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
      state.finalAmount = state.appliedVoucher ? calculateDiscount(state.totalAmount, state.appliedVoucher) : state.totalAmount;
    },

    applyVoucher(state, action) {
      state.appliedVoucher = action.payload;
      state.finalAmount = calculateDiscount(state.totalAmount, action.payload);
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.appliedVoucher = null;
      state.finalAmount = 0;
    }
  }
});

// Helper Logic for Discount Calculation
const calculateDiscount = (total, voucher) => {
  if (voucher.type === 'percentage') {
    return total - (total * (voucher.value / 100));
  } else if (voucher.type === 'flat') {
    return total - voucher.value;
  }
  return total;
};

// --- 2. UI SLICE (Managing Themes & Modals) ---
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isCartOpen: false,
    notification: null,
    isDarkMode: true
  },
  reducers: {
    toggleCart(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    showNotification(state, action) {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type // 'success' | 'error' | 'info'
      };
    },
    clearNotification(state) {
      state.notification = null;
    }
  }
});

// --- 3. PERSISTENCE MIDDLEWARE (Local Storage Sync) ---
const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem('FATIMAS_KITCHEN_STATE', JSON.stringify(state.cart));
  return result;
};

// --- 4. LOAD SAVED STATE ---
const rehydrateState = () => {
  const savedState = localStorage.getItem('FATIMAS_KITCHEN_STATE');
  if (savedState) return JSON.parse(savedState);
  return undefined;
};

// --- 5. STORE CONFIGURATION ---
const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    ui: uiSlice.reducer
  },
  preloadedState: {
    cart: rehydrateState()
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(localStorageMiddleware)
});

// --- EXPORTS ---
export const cartActions = cartSlice.actions;
export const uiActions = uiSlice.actions;
export default store;
                       
