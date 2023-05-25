import { combineReducers, configureStore } from '@reduxjs/toolkit'
import playerReducer from './reducers/playerReducer'
import trackReducer from './reducers/trackReducer'
import { useDispatch } from 'react-redux'
const rootReducer = combineReducers(
    {
        player: playerReducer,
        track: trackReducer,
    }
)

export const store = configureStore({
    reducer: rootReducer,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch