import React, { useEffect } from 'react';
import MainLayout from "../../layouts/MainLayout";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/router";
import TrackList from "../../components/TrackList";
import { useDispatch, useSelector } from 'react-redux';
import { errorState, fetchTracks, tracksState } from '@/store/reducers/trackReducer';
import { AppDispatch } from '@/store';

const Index = () => {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>();
    const tracks = useSelector(tracksState)
    const error = useSelector(errorState)

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    useEffect(() => {
        dispatch(fetchTracks());
    }, [])

    return (
        <MainLayout title={"Список треков - музыкальная площадка"}>
            <Grid container justifyContent='center'>
                <Card style={{ width: 900 }}>
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Список треков</h1>
                            <Button onClick={() => router.push('/tracks/create')}>
                                Загрузить
                            </Button>
                        </Grid>
                    </Box>
                    <TrackList tracks={tracks} />
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;
