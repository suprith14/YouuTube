import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import userSliceReducer from "./userSlice";
import movieSliceReducer from "./movieSlice";
import languageSliceReducer from "./languageSlice";





// 1.  Combine your reducers
const rootReducer = combineReducers({
    user: userSliceReducer,
    movie: movieSliceReducer,
    language: languageSliceReducer,
})
// 2/Create a persist configuration
const persistConfig = {
    key: 'root',// Key for the persist store
    storage,       // Use localStorage as default
}

// Enhance your root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// 3. Create a store with the persisted reducer


// Create a store with the persisted reducer
const appStore = configureStore({                    // Create a store with the persisted reducer
    reducer: persistedReducer,                      // Use the persisted reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
    preloadedState: {                                // Initial state for the store
        user: {                                      // Initial state for user slice
            toggleloginIn: false,                    // Initial state for toggleloginIn
            userInfo: null,
        },
        movie: {
            movies: [],
            selectedMovie: null,
        },                                            // Initial state for movie slice
    }
})


// 4. Create a persistor from the store
export const persistor = persistStore(appStore)
// 5. Export the store and persistor
export default appStore;