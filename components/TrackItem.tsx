import React, { useEffect } from 'react';
import { ITrack } from "../types/track";
import { Card, Grid, IconButton } from "@mui/material";
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { active, pause, set_active, set_pause, set_play } from '@/store/reducers/playerReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';
import { client } from '@/api/client';
import { fetchTracks } from '@/store/reducers/trackReducer';

interface TrackItemProps {
    track: ITrack;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
    const router = useRouter()
    const activeState = useSelector(active)
    const pauseState = useSelector(pause)
    const dispatch = useDispatch<AppDispatch>()
    const play = (e: any) => {
        e.stopPropagation();
        const isTrackActive = activeState && activeState?._id === track?._id;
        if (!isTrackActive) {
            dispatch(set_active(track))
        }
        else {
            if (pauseState) dispatch(set_play());
            else {
                dispatch(set_pause())
            }
        }
    }
    const deleteTrack = (e: any) => {
        e.stopPropagation();
        client
            .delete(track?._id)
            .then(() => {
                dispatch(fetchTracks());
            });
    };

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
                {activeState && activeState?._id === track?._id && !pauseState
                    ? <Pause />
                    : <PlayArrow />
                }
            </IconButton>
            <img style={{ margin: "0 10px" }} width={70} height={70} src={track.picture} />
            <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
                <div>{track.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
            </Grid>
            {activeState?._id === track?._id && <div>02:42 / 03:22</div>}
            <IconButton onClick={deleteTrack} style={{ marginLeft: 'auto' }}>
                <Delete />
            </IconButton>
        </Card>
    );
};

export default TrackItem;
