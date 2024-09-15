import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';

const BRANDS_SLICE_NAME = 'brands';

const initialState = {
  brands: [],
  isFetching: false,
  error: null,
};

export const getBrandsThunk = createAsyncThunk(
  `${BRANDS_SLICE_NAME}/getAll`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getBrands();
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

const handleBrandsPending = state => {
  state.isFetching = true;
  state.error = null;
};

const handleBrandsRejected = (state, { payload }) => {
  state.error = payload;
  state.isFetching = false;
};

const brandsSlice = createSlice({
  name: BRANDS_SLICE_NAME,
  initialState,
  extraReducers: builder => {
    builder.addCase(getBrandsThunk.pending, handleBrandsPending);
    builder.addCase(getBrandsThunk.fulfilled, (state, { payload }) => {
      state.brands = payload;
      state.isFetching = false;
    });
    builder.addCase(getBrandsThunk.rejected, handleBrandsRejected);
  },
});

const { reducer } = brandsSlice;

export default reducer;
