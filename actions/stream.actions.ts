'use server';

import { StreamClient } from '@stream-io/node-sdk';
import { currentUser } from "@clerk/nextjs/server";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const tokenProvider = async() =>{
    const user = await currentUser();

    if(!user) throw new Error('User is not loggedin');
    if(!apiKey) throw new Error('No Api Key');
    if(!apiSecret) throw new Error('No Api Secret');
    
    const client = new StreamClient(apiKey, apiSecret);

    const exp = Math.round(Date.now() / 1000) + 3600;

    const issue = Math.floor(Date.now() / 1000) - 60;

    const token = client.createToken(user.id, exp, issue);

    return token;
}