import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './playerSlice'
import newYearEventReducer from './newYearEventSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            player: playerReducer,
            newYearEvent: newYearEventReducer
        },
    })
}

export type RootState = ReturnType<AppStore['getState']>
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']