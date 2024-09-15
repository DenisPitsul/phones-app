import { configureStore } from '@reduxjs/toolkit';
import brandsReducer from './slices/brandsSlice';
import phonesReducer from './slices/phonesSlice';

const store = configureStore({
  reducer: {
    phonesData: phonesReducer,
    brandsData: brandsReducer,
  },
});

export default store;
