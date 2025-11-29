import React from 'react';


import { Profile } from '@widgets/profile/';
import { ChatModal } from '@entities/chat/';
import { Header } from './Header';



export const UserPage: React.FunctionComponent = () => {
    return (<>
        <Header />

        <Profile />

        <ChatModal />
    </>);
}