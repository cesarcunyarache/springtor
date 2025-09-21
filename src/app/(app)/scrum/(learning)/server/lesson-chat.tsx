import { auth } from '@/auth';
import { Chat } from '@/components/chat'
import { DataStreamHandler } from '@/components/data-stream-handler';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { getChatById, getMessagesByChatId } from '@/lib/db/queries/chat';
import { DBMessage } from '@/lib/db/schema';
import { Attachment, UIMessage } from 'ai';
import { notFound } from 'next/dist/client/components/not-found';

 import type { VisibilityType } from '@/components/visibility-selector';

import { redirect } from 'next/navigation';
import { generateUUID } from '@/lib/utils';

export default async function LessonChat({ lessonId }: { lessonId: string }) {


    const id = generateUUID();

    const chat = await getChatById({ id });

    const session = await auth();

    if (!session) {
        redirect('/api/auth/guest');
    }


    const messagesFromDb = await getMessagesByChatId({
        id,
    });

   
    function convertToUIMessages(messages: Array<DBMessage>): Array<UIMessage> {
        return messages.map((message) => ({
            id: message.id,
            parts: message.parts as UIMessage['parts'],
            role: message.role as UIMessage['role'],
            // Note: content will soon be deprecated in @ai-sdk/react
            content: '',
            createdAt: message.createdAt,
            experimental_attachments:
                (message.attachments as Array<Attachment>) ?? [],
        }));
    }


    return (


        <>
            <Chat
                id={chat?.id ?? id}
                initialMessages={ convertToUIMessages(messagesFromDb ?? []) }
                initialChatModel={DEFAULT_CHAT_MODEL}
                initialVisibilityType={'private'}
                isReadonly={false}
                session={session}
                autoResume={true}
                isRedirect={false}
            />
            <DataStreamHandler id={id} />
        </>


    )
}