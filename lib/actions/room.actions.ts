'use server';

import { nanoid } from 'nanoid';
import { liveblocks } from '../liveblocks';
import { revalidatePath } from 'next/cache';
import { parseStringify } from '../utils';

export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
    const roomId = nanoid();

    const metadata = {
        createrId: userId,
        email,
        title: 'untitled'
    };

    const usersAccesses: RoomAccesses = {
        [email]: ['room:write']
    };

    try {
        // takes room id, metadata, usersAccesses, defaultAccesses
        const room = await liveblocks.createRoom(roomId, {
            metadata,
            usersAccesses,
            defaultAccesses: ['room:write']
        });

        revalidatePath('/');

        return parseStringify(room);
    }catch(error) {
        console.error(`Error happended while creating room; ${error}`);
    }
};

export const getDocument = async ({ roomId, userId}: { roomId: string, userId: string }) => {
    try {
        const room = await liveblocks.getRoom(roomId);
    
        const hasAccess = Object.keys(room.usersAccesses).includes(userId);
    
        if(!hasAccess) {
            throw new Error('You do not have access to this documents');
        }
    
        return parseStringify(room);
    } catch (error) {
        console.error(`Error while validating user for document: ${error}`);
    }
}