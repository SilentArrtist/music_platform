import React, { useEffect } from 'react';
import { Pause, PlayArrow, VolumeUp } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import styles from '../styles/Player.module.scss'
import TrackProgress from "./TrackProgress";
import { useDispatch, useSelector } from 'react-redux';
import { active, close_player, currentTime, duration, pause, reset_audio, set_current_time, set_duration, set_pause, set_play, set_volume, volume } from '@/store/reducers/playerReducer';
import { AppDispatch } from '@/store';
import { updateListens } from '@/store/reducers/trackReducer';
import { SecondsToMMSS } from '../utils/SecondsToMMSS'
let audio: any;

const Player = () => {
    const pauseState = useSelector(pause);
    const volumeState = useSelector(volume);
    const activeAudio = useSelector(active);
    const durationState = useSelector(duration);
    const currentTimeState = useSelector(currentTime);
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        // console.log(activeAudio, audio);

        if (!audio) {
            audio = new Audio()
        } else {
            if (audio.src !== `https://cdn.sanity.io/files/ewl3r917/production/${activeAudio?.audio}`) {
                audio.pause();
                setAudio()
            }
        }
    }, [activeAudio])

    useEffect(() => {
        if (!pauseState) {
            audio.play()
        } else {
            audio.pause()
        }
    }, [pauseState])

    const setAudio = () => {
        if (activeAudio) {
            audio.src = 'https://cdn.sanity.io/files/ewl3r917/production/' + activeAudio.audio
            audio.volume = volumeState / 100
            audio.play()
            audio.onloadedmetadata = () => {
                dispatch(set_duration(Math.ceil(audio.duration)))
                // audio.play()
            }
            audio.ontimeupdate = () => {
                dispatch(set_current_time(Math.ceil(audio.currentTime)))
            }
            audio.onended = () => {
                dispatch(updateListens(activeAudio._id))
                dispatch(reset_audio());
            }
        }
    }

    const play = () => {

        if (!audio && !activeAudio) return;
        if (pauseState) {
            dispatch(set_play())
            if (audio)
                audio.play()
        } else {
            dispatch(set_pause())
            if (audio)
                audio.pause()
        }
    }
    const resetAudio = () => {
        audio.pause();
        audio = null;
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        dispatch(set_volume(Number(e.target.value)))
    }
    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        dispatch(set_current_time(Number(e.target.value)))
    }

    if (!activeAudio) {
        return null
    }

    return (
        <div className={styles.player} style={{ padding: "0 30px" }}>
            <IconButton onClick={play}>
                {pauseState
                    ? <PlayArrow />
                    : <Pause />
                }
            </IconButton>
            <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
                <div>{activeAudio?.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{activeAudio?.artist}</div>
            </Grid>
            <TrackProgress left={currentTimeState} right={durationState} onChange={changeCurrentTime} width='40vw' changeType={SecondsToMMSS} />
            <VolumeUp style={{ marginLeft: 'auto' }} />
            <TrackProgress left={volumeState} right={100} onChange={changeVolume} width='10vw' />
            <IconButton onClick={() => { dispatch(close_player()); resetAudio(); }}>
                <CloseIcon />
            </IconButton>
        </div>
    );
};

export default Player;
