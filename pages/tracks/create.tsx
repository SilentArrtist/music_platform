import React, { useEffect, useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import { Button, Grid, TextField } from "@mui/material";
import FileUpload from "../../components/FileUpload";
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { useRouter } from "next/router";

const Create = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState<any>(null)
    const [pictureSrc, setPictureSrc] = useState<string>("")
    const [audio, setAudio] = useState<any>(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

    const onFileSelected = (event: any) => {
        if (!event) return;
        const selectedFile = event;
        setPicture(event)
        const reader = new FileReader();

        reader.onload = function (event: any) {
            setPictureSrc(event.target.result)
        };

        reader.readAsDataURL(selectedFile);
    }
    const next = () => {
        if (name.value.length <= 0 || artist.value.length <= 0 || text.value.length <= 0) return;
        if (picture === null) return;
        if (audio === null) return;
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            axios.post('http://localhost:5000/tracks', formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e))
        }
    }

    const back = () => {
        setActiveStep(prev => prev - 1);
    }

    return (
        <MainLayout>
            <StepWrapper activeStep={activeStep}>
                {activeStep === 0 &&
                    <Grid container direction={"column"} style={{ padding: 20 }}>
                        <TextField
                            {...name}
                            style={{ marginTop: 10 }}
                            label={"Название трека"}
                        />
                        <TextField
                            {...artist}
                            style={{ marginTop: 10 }}
                            label={"Имя исполнителя"}
                        />
                        <TextField
                            {...text}
                            style={{ marginTop: 10 }}
                            label={"Слова к треку"}
                            multiline
                            rows={3}
                        />
                    </Grid>
                }
                {activeStep === 1 &&
                    <FileUpload setFile={onFileSelected} accept="image/*">
                        <Button>Загрузить изображение</Button>
                        {
                            picture &&
                            <div>
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>Ваше фото:</span>
                                <img src={pictureSrc} alt="" style={{
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                    maxWidth: "150px",
                                    maxHeight: "150px",
                                    border: "1px solid black"
                                }} />
                            </div>
                        }
                    </FileUpload>
                }
                {activeStep === 2 &&
                    <FileUpload setFile={setAudio} accept="audio/*">
                        <Button>Загрузить аудио</Button>
                        {
                            audio &&
                            <div>
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>Ваше аудио:</span>
                                <p
                                    style={{
                                        border: "1px solid black",
                                        padding: "5px"
                                    }}
                                >{audio?.name}</p>
                            </div>
                        }
                    </FileUpload>
                }
            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
                <Button onClick={next}>Далее</Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;
