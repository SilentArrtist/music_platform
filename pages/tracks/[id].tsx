import React, { useEffect, useState } from 'react';
import { ITrack } from "../../types/track";
import MainLayout from "../../layouts/MainLayout";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { useInput } from "../../hooks/useInput";
import { useSelector } from 'react-redux';
import { active } from '@/store/reducers/playerReducer';
import { client } from '@/api/client';
import { trackQuery } from '@/api/clientQueries';

interface TrackPageProps {
    serverTrack: ITrack
}

const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }) => {
    const [track, setTrack] = useState<ITrack>()
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')
    useEffect(() => {
        if (typeof (router?.query?.id) === 'string') {
            const fetchTrackById = async (id: string) => {
                const data = await client.fetch(trackQuery(id));
                const audioUrlArray = data[0].audio.asset._ref.split('-');
                const audioUrl = `${audioUrlArray[1]}.${audioUrlArray[2]}`
                const trackFromApi = {
                    _id: data[0]?._id,
                    name: data[0]?.name,
                    artist: data[0]?.artist,
                    text: data[0]?.text,
                    listens: data[0]?.listens,
                    picture: data[0]?.picture.asset.url,
                    audio: audioUrl,
                    comments: data[0]?.comments
                }
                setTrack(trackFromApi);
            }
            fetchTrackById(router?.query?.id)
        }
    }, [router])

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: router?.query?.id
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayout
            title={"Музыкальная площадка - " + track?.name + " - " + track?.artist}
            keywords={'Музыка, артисты, ' + track?.name + ", " + track?.artist}
        >
            <Button
                variant={"outlined"}
                style={{ fontSize: 32 }}
                onClick={() => router.push('/tracks')}
            >
                К списку
            </Button>
            <Grid container style={{ margin: '20px 0' }}>
                <img src={track?.picture} width={200} height={200} />
                <div style={{ marginLeft: 30 }}>
                    <h2>Название трека - {track?.name}</h2>
                    <h2>Исполнитель - {track?.artist}</h2>
                    <h2>Прослушиваний - {track?.listens}</h2>
                </div>
            </Grid>
            <h2>Слова в треке</h2>
            <p>{track?.text}</p>
            <h3>Комментарии</h3>
            <Grid container>

                <TextField
                    label="Ваше имя"
                    fullWidth
                    {...username}
                />
                <TextField
                    label="Комментарий"
                    {...text}
                    fullWidth
                    multiline
                    rows={4}
                />
                <Button onClick={addComment}>Отправить</Button>
            </Grid>
            <div>
                {track?.comments?.map(comment =>
                    <div>
                        <div>Автор - {comment.username}</div>
                        <div>Комментарий - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;
