import React, { useEffect, useState } from 'react';
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import { Button, Grid, TextField } from "@mui/material";
import FileUpload from "../../components/FileUpload";
import { useInput } from "../../hooks/useInput";
import axios from "axios";
import { useRouter } from "next/router";
import { v4 } from 'uuid'
import { client } from '@/api/client';
import { SanityAssetDocument, SanityImageAssetDocument } from '@sanity/client';
import { log } from 'console';
const Create = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState<any>(null)
    const [pictureSrc, setPictureSrc] = useState<string>("")
    const [pictureAsset, setPictureAsset] = useState<any>(null)
    const [audio, setAudio] = useState<any>(null)
    const [audioAsset, setAudioAsset] = useState<any>(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')
    const router = useRouter()

    const onFileSelected = (event: any) => {
        if (!event) return;
        const selectedFile = event;
        setPicture(event)
        const reader = new FileReader();
        reader.onload = function (e: any) {
            setPictureSrc(e.target.result)
            client.assets
                .upload('image', event, { contentType: event.type, filename: event.name })
                .then((document) => {
                    setPictureAsset(document)
                })
                .catch((error) => {
                    console.log('Upload failed:', error.message);
                });
        };
        reader.readAsDataURL(selectedFile);
    }


    const onAudioSelected = (event: any) => {
        if (!event) return;
        setAudio(event);
        console.log(event);

        client.assets
            .upload('file', event, { contentType: event.type, filename: event.name })
            .then((document) => {
                setAudioAsset(document);
            })
            .catch((error) => {
                console.log('Upload failed:', error.message);
            });
    }

    const next = async () => {
        if (activeStep === 0) {
            if (name.value.length <= 0 || artist.value.length <= 0 || text.value.length <= 0) return;
        }
        if (activeStep === 1) {
            if (picture === null) return;
        }
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            if (audio === null || pictureAsset === null || audioAsset === null) return;

            const doc = {
                _id: v4(),
                _type: 'track',
                name: name.value,
                text: text.value,
                artist: artist.value,
                listens: 0,
                picture: {
                    _type: 'image',
                    asset: {
                        _type: 'reference',
                        _ref: pictureAsset?._id,
                    },
                },
                audio: {
                    _type: 'fileAsset',
                    asset: {
                        _type: 'reference',
                        _ref: audioAsset?._id,
                    },
                },
            }

            client.create(doc).then(() => {
                router.push('/tracks')
            });



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
                    <FileUpload setFile={onAudioSelected} accept="audio/*">
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
