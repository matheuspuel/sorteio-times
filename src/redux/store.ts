import { combineReducers, configureStore } from '@reduxjs/toolkit'
import throttle from 'lodash.throttle'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import hydrated from './slices/hydrated'
import preview from './slices/preview'

import {
  hydrateReducer,
  hydrateStore,
  saveState,
} from 'src/redux/slices/hydrated'
import { getCache, setCache } from './cache'
// import { api } from './api'

const rootReducer = combineReducers({
  // [api.reducerPath]: api.reducer,
  preview,
  hydrated,
})

const reducer: typeof rootReducer = (state, action) =>
  hydrateReducer(rootReducer(state, action), action)

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .concat(api.middleware),
  preloadedState: __DEV__ ? getCache() : undefined,
})
if (__DEV__) store.subscribe(() => setCache(store.getState()))
export default store

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

store.subscribe(throttle(() => store.dispatch(saveState()), 1000))
// store.dispatch(listenToAppState())
store.dispatch(hydrateStore()).then(() => {
  // store.dispatch(listenToConnectivity())
})
