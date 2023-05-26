import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { PlayerState } from "../../types/player";
import { ITrack } from '@/types/track';
import { RootState } from '..';


const initialState: PlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 50,
    pause: true
}

const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        set_pause: (state) => {
            state.pause = true;
        },
        set_play: (state) => {
            state.pause = false;
        },
        set_current_time: (state, action: PayloadAction<number>) => {
            state.currentTime = action.payload
        },
        set_volume: (state, action: PayloadAction<number>) => {
            state.volume = action.payload
        },
        set_duration: (state, action: PayloadAction<number>) => {
            state.duration = action.payload
        },
        set_active: (state, action: PayloadAction<ITrack>) => {
            state.active = action.payload;
            state.duration = 0;
            state.currentTime = 0;
            state.pause = false;

        },
        reset_audio: (state) => {
            state.currentTime = 0;
            state.pause = true;
        },
        close_player: (state) => {
            state.active = null;
            state.currentTime = 0;
            state.duration = 0;
            state.active = null;
            state.volume = 50;
            state.pause = true;
        },
    },
})

export default playerSlice.reducer;

export const currentTime = (state: RootState) => state.player.currentTime
export const duration = (state: RootState) => state.player.duration
export const active = (state: RootState) => state.player.active
export const volume = (state: RootState) => state.player.volume
export const pause = (state: RootState) => state.player.pause

export const { set_pause, set_play, set_current_time, set_volume, set_duration, set_active, reset_audio, close_player } = playerSlice.actions