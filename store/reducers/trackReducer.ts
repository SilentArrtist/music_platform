import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TrackState } from "../../types/track";
import { ITrack } from '@/types/track';
import { RootState } from '..';
import { client } from '../../api/client'
import { feedQuery, trackQuery } from '../../api/clientQueries'
import { v4 } from 'uuid'
const initialState: TrackState = {
    tracks: [],
    error: '',
}

export const fetchTracks = createAsyncThunk(
    'track/fetchTracks',
    async function () {
        const data = await client.fetch(feedQuery());
        const formatedData: ITrack[] = [];
        data.forEach((element: any) => {
            const audioUrlArray = element.audio.asset._ref.split('-');
            const audioUrl = `${audioUrlArray[1]}.${audioUrlArray[2]}`
            const arrElem = {
                _id: element._id,
                name: element.name,
                artist: element.artist,
                text: element.text,
                listens: element.listens,
                picture: element.picture.asset.url,
                audio: audioUrl,
                comments: element.comments
            }
            formatedData.push(arrElem);
        });

        return formatedData;
    }
)

export const updateListens = createAsyncThunk(
    'track/updateListens',
    async function (_id: any) {
        const track = await client.fetch(trackQuery(_id));
        client
            .patch(_id)
            .set({ listens: track[0].listens + 1 })
            .commit()
    }
)

export const addComent = createAsyncThunk(
    'track/addComent',
    async function ({ _id, comment }: any) {
        client
            .patch(_id)
            .setIfMissing({ comments: [] })
            .insert('after', 'comments[-1]', [{ ...comment, _key: v4() }])
            .commit()
            .then(res => console.log(res))
    }
)


export const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        error: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        tracks: (state, action: PayloadAction<ITrack[]>) => {
            state.tracks = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTracks.fulfilled, (state, action) => {
            state.tracks = action.payload;
        })
        builder.addCase(fetchTracks.rejected, (state) => {
            state.error = "Проблема с загрузкой";
        })
    },
})

export default trackSlice.reducer;

export const tracksState = (state: RootState) => state.track.tracks
export const errorState = (state: RootState) => state.track.error

export const { error, tracks } = trackSlice.actions
