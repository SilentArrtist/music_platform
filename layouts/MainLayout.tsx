import React from 'react';
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import Head from "next/head";

interface MainLayoutProps {
    children: any,
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps>
    = ({
        children,
        title,
        description,
        keywords
    }) => {
        return (
            <>
                <Head>
                    <title>{title || 'Музыкальная площадка'}</title>
                    <meta name="description" content={`Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.` + description} />
                    <meta name="robots" content="index, follow" />
                    <meta name="keywords" content={keywords || "Музыка, треки, артисты"} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                <Navbar />
                <div style={{ margin: '90px auto 0 auto', padding: '0 20px', maxWidth: "1300px" }}>
                    {children}
                </div>
                <Player />
            </>
        );
    };

export default MainLayout;
