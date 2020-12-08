import { createSlice } from '@reduxjs/toolkit';
import {
  getMeAPI,
  updateUserAPI,
  updatePasswordAPI,
  uploadAvatarAPI,
} from '../../../webAPI/userAPI';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    errorMessage: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },

    setVendorInfo: (state, action) => {
      state.vendorInfo = action.payload;
    },
  },
});

export const { setUser, setErrorMessage } = userSlice.actions;

export const getMe = () => (dispatch) => {
  dispatch(setUser({}));
  dispatch(setErrorMessage(''));
  getMeAPI().then((result) => {
    if (!result || result.ok === 0)
      return dispatch(
        setErrorMessage(result ? result.message : 'something wrong')
      );
    dispatch(setUser(result.data));
  });
};

export const updateUser = (data) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return updateUserAPI(data).then((result) => {
    if (!result || result.ok === 0)
      return dispatch(
        setErrorMessage(result ? result.message : 'something wrong')
      );
    getMe();
    return result;
  });
};

export const updatePassword = (data) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return updatePasswordAPI(data).then((result) => {
    if (!result || result.ok === 0)
      return dispatch(
        setErrorMessage(result ? result.message : 'something wrong')
      );
    getMe();
    return result;
  });
};

export const uploadAvatar = (data) => (dispatch) => {
  dispatch(setErrorMessage(''));
  return uploadAvatarAPI(data).then((result) => {
    if (!result || result.ok === 0)
      return dispatch(
        setErrorMessage(result ? result.message : 'something wrong')
      );
    getMe();
    return result;
  });
};

export const selectUser = (state) => state.user.user;
export const selectErrorMessage = (state) => state.user.errorMessage;
export default userSlice.reducer;
