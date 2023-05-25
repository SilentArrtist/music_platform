import React from 'react';
import { ITrack } from "../types/track";
import { Card, Grid, IconButton } from "@mui/material";
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { active, set_active } from '@/store/reducers/playerReducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/store';

interface TrackItemProps {
    track: ITrack;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
    const router = useRouter()
    const activeState = useSelector(active)
    const dispatch = useDispatch<AppDispatch>()
    const play = (e: any) => {
        e.stopPropagation();
        dispatch(set_active(track))
    }

    return (
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            <IconButton onClick={play}>
                {!activeState
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <img width={70} height={70} src={track.picture} />
            <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
                <div>{track.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
            </Grid>
            {activeState && <div>02:42 / 03:22</div>}
            <IconButton onClick={e => e.stopPropagation()} style={{ marginLeft: 'auto' }}>
                <Delete />
            </IconButton>
        </Card>
    );
};

export default TrackItem;
