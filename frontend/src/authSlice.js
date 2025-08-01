// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axiosClient from './utils/axiosClint'




// export const registerUser = createAsyncThunk(
//   'auth/register',  // This is the Redux action type prefix used internally by createAsyncThunk.
//   async (userData, { rejectWithValue }) => {      //in userData we pass value which we get after responce on login,signup etc..
//     try {
//       const response = await axiosClient.post('/auth/register', userData, { withCredentials: true });  // later one we pass to backend at it addres
//       return response.data.user; // bcz in backend we send like res.send({user:reply,message:"njknv"}) so it call data.user
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );





// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axiosClient.post('/auth/login', credentials, {
//         withCredentials: true
//       });
//       const authResponse = await axiosClient.get('/auth/check', { withCredentials: true });
//       return authResponse.data?.user;

//     } catch (error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         return rejectWithValue({
//           message: error.response.data.error || 'Login failed',
//           field: error.response.data.field || null,
//           details: error.response.data.details || null
//         });
//       } else if (error.request) {
//         // The request was made but no response was received
//         return rejectWithValue({
//           message: 'No response from server',
//           details: 'Network error or server is down'
//         });
//       } else {
//         // Something happened in setting up the request
//         return rejectWithValue({
//           message: 'Request setup error',
//           details: error.message
//         });
//       }
//     }
//   }
// );


// export const checkAuth = createAsyncThunk(
//   'auth/checkthunk',
//   async (_, { rejectWithValue }) => {
//     try {
//       const { data } = await axiosClient.get('/auth/check', { withCredentials: true });
//       return data?.user;
//     } catch (error) {
//       console.log('Error in checkAuth:', error);

//       return rejectWithValue(error);
//     }
//   }
// );

// export const logoutUser = createAsyncThunk(
//   'auth/logoutThunk',
//   async (_, { rejectWithValue }) => {
//     try {
//       await axiosClient.post('/auth/logout');
//       return null;
//     } catch (error) {
//       console.log('Error in login:', error);

//       return rejectWithValue(error);


//     }
//   }
// );


// //hear we implement logic if user visit again after login ,

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     isAuthenticated: false,
//     loading: false,
//     error: null
//   },
//   reducers: {
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register User Cases
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = !!action.payload;
//         state.user = action.payload;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       })
//       //  login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = !!action.payload;
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       })

//       // Check Auth Cases
//       .addCase(checkAuth.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         // state.error = action.payload?.message || 'Something went wrong';

//       })
//       .addCase(checkAuth.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = !!action.payload;
//         state.user = action.payload;
//       })
//       .addCase(checkAuth.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       })

//       // Logout User Cases
//       .addCase(logoutUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(logoutUser.fulfilled, (state) => {
//         state.loading = false;
//         state.user = null;
//         state.isAuthenticated = false;
//         state.error = null;
//       })
//       .addCase(logoutUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Something went wrong';
//         state.isAuthenticated = false;
//         state.user = null;
//       });
//   }
// });

// export default authSlice.reducer;



import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// Ensure the path to your axiosClient is correct
import axiosClient from './utils/axiosClint';

//============================================
// 1. ASYNCHRONOUS THUNKS
//============================================

// For standard email/password registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/auth/register', userData);
      // The payload for the 'fulfilled' action will be the user object
      return response.data.user;
    } catch (error) {
      // Pass the specific server error message to the 'rejected' action
      return rejectWithValue(error.response?.data?.error || 'An unknown error occurred.');
    }
  }
);

// For standard email/password login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/auth/login', credentials);
      // The payload for the 'fulfilled' action will be the user object
      return response.data.user;
    } catch (error) {
      // Pass a more detailed error object for form-specific feedback
      return rejectWithValue({
        message: error.response?.data?.error || 'Login failed.',
        field: error.response?.data?.field || null,
      });
    }
  }
);

// To check if a user is still authenticated on app load
export const checkAuth = createAsyncThunk(
  'auth/check',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosClient.get('/auth/check');
      return data?.user;
    } catch (error) {
      // If check fails, it's not really an "error" to show the user,
      // it just means they aren't logged in.
      return rejectWithValue('No active session.');
    }
  }
);

// For logging the user out
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosClient.post('/auth/logout');
      return null; // Successful logout returns null
    } catch (error) {
      return rejectWithValue('Logout failed. Please try again.');
    }
  }
);


//============================================
// 2. SLICE DEFINITION
//============================================

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  },

  // Synchronous reducers: Direct state manipulation
  reducers: {
    // This is the crucial reducer for the GitHub OAuth flow.
    // It takes the user object received from the popup and sets the state.
    setAuthUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload; // action.payload IS the user object
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },

  // Asynchronous reducers: Handled by the thunks above
  extraReducers: (builder) => {
    builder
      // --- Register User Cases ---
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // The error message from rejectWithValue
        state.isAuthenticated = false;
        state.user = null;
      })

      // --- Login User Cases ---
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        // The action.payload here is the object { message, field }
        state.error = action.payload.message;
        state.isAuthenticated = false;
        state.user = null;
      })

      // --- Check Auth Cases ---
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })

      // --- Logout User Cases ---
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        // Even if logout fails on the server, we log them out on the client
        state.error = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});


//============================================
// 3. EXPORTS
//============================================

// Export the synchronous action creators
export const { setAuthUser, clearError } = authSlice.actions;

// Export the slice reducer as the default export
export default authSlice.reducer;