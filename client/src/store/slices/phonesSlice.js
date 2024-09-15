import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as API from '../../api';
import CONSTANTS from '../../constants';

const PHONES_SLICE_NAME = 'phones';

const initialState = {
  phones: [],
  phone: null,
  totalPages: 0,
  page: 1,
  isFetching: false,
  error: null,
  createStatus: CONSTANTS.STATUS.IDLE,
  updateStatus: CONSTANTS.STATUS.IDLE,
  deleteStatus: CONSTANTS.STATUS.IDLE,
};

export const createPhoneThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/create`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.createPhone(payload);
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const getPhonesThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/getAll`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await API.getPhones(payload);
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const getPhoneByIdThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/getById`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.getPhoneById(payload);
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const updatePhoneByIdThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/updateById`,
  async (payload, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await API.updatePhoneById(payload.id, payload.data);
      return data;
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

export const deletePhoneByIdThunk = createAsyncThunk(
  `${PHONES_SLICE_NAME}/deleteById`,
  async (payload, { rejectWithValue }) => {
    try {
      await API.deletePhoneById(payload);
    } catch (err) {
      return rejectWithValue({ errors: err.response.data });
    }
  }
);

const phonesSlice = createSlice({
  name: PHONES_SLICE_NAME,
  initialState,
  reducers: {
    clearPhone: state => {
      state.phone = null;
    },
    changeCreateStatus: (state, { payload }) => {
      state.createStatus = payload;
    },
    changeUpdateStatus: (state, { payload }) => {
      state.updateStatus = payload;
    },
    changeDeleteStatus: (state, { payload }) => {
      state.deleteStatus = payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(createPhoneThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
      state.createStatus = CONSTANTS.STATUS.IDLE;
    });
    builder.addCase(createPhoneThunk.fulfilled, (state, { payload }) => {
      state.createStatus = CONSTANTS.STATUS.SUCCESS;
      state.phone = payload;
      state.isFetching = false;
    });
    builder.addCase(createPhoneThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.createStatus = CONSTANTS.STATUS.ERROR;
      state.isFetching = false;
    });

    builder.addCase(getPhonesThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getPhonesThunk.fulfilled, (state, { payload }) => {
      if (payload.page === 1) {
        state.phones = payload.data;
      } else {
        state.phones.push(...payload.data);
      }
      state.totalPages = payload.totalPages;
      state.page = payload.page;
      state.isFetching = false;
    });
    builder.addCase(getPhonesThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    builder.addCase(getPhoneByIdThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getPhoneByIdThunk.fulfilled, (state, { payload }) => {
      state.phone = payload;
      state.isFetching = false;
    });
    builder.addCase(getPhoneByIdThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.isFetching = false;
    });

    builder.addCase(updatePhoneByIdThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
      state.updateStatus = CONSTANTS.STATUS.IDLE;
    });
    builder.addCase(updatePhoneByIdThunk.fulfilled, (state, { payload }) => {
      state.updateStatus = CONSTANTS.STATUS.SUCCESS;
      state.phone = payload;
      state.isFetching = false;
    });
    builder.addCase(updatePhoneByIdThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.updateStatus = CONSTANTS.STATUS.ERROR;
      state.isFetching = false;
    });

    builder.addCase(deletePhoneByIdThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
      state.deleteStatus = CONSTANTS.STATUS.IDLE;
    });
    builder.addCase(deletePhoneByIdThunk.fulfilled, state => {
      state.deleteStatus = CONSTANTS.STATUS.SUCCESS;
      state.isFetching = false;
    });
    builder.addCase(deletePhoneByIdThunk.rejected, (state, { payload }) => {
      state.error = payload;
      state.deleteStatus = CONSTANTS.STATUS.ERROR;
      state.isFetching = false;
    });
  },
});

const { reducer, actions } = phonesSlice;

export const {
  clearPhone,
  changeCreateStatus,
  changeUpdateStatus,
  changeDeleteStatus,
  clearError,
} = actions;

export default reducer;
