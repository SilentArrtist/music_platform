import React, { useEffect } from 'react';
import { Button } from "@mui/material";
import Navbar from "../components/Navbar";
import MainLayout from "../layouts/MainLayout";

const Index = () => {
    return (
        <>
            <MainLayout>
                <div className="centerBlock">
                    <h1>Добро пожаловать!</h1>
                    <h2>Здесь собраны лучшие треки!</h2>
                </div>
            </MainLayout>

            <style jsx>
                {`
                    .centerBlock {
                        margin: 0 auto;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        height:100vh;
                        justify-content: center;
                `}
            </style>
        </>
    );
};

export default Index;
