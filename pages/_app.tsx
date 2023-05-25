import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { store } from '../store'
import { Provider } from 'react-redux'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => (
    <Provider store={store}>
        <Component {...pageProps} />
    </Provider>

);

export default (WrappedApp);
