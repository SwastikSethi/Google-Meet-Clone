"use client";

import { ReactNode, useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';
import { useUser } from '@clerk/nextjs';
import { tokenProvider } from '@/actions/stream.actions';
import Loader from '@/components/Loader';

const APIkey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {

    const [videoClient, setvideoClient] = useState<StreamVideoClient>();
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (!isLoaded || !user) return;
        if (!APIkey) throw new Error('Stream Api Key Missing');

        const client = new StreamVideoClient({
            apiKey: APIkey,
            user: {
                id: user?.id,
                name: user?.username || user?.fullName || user?.primaryEmailAddress?.toString() || `user${user?.id.substring(5,10)}`,
                image: user?.imageUrl,
            },
            tokenProvider: tokenProvider,
        })

        setvideoClient(client);
    }, [user, isLoaded])

    if (!videoClient) return <Loader />

    return (
        <StreamVideo client={videoClient}>
            {children}
        </StreamVideo>
    );
};

export default StreamVideoProvider;