import { auth } from '@/auth';
import { Chat } from '@/components/chat'
import { DataStreamHandler } from '@/components/data-stream-handler';
import { DEFAULT_CHAT_MODEL } from '@/lib/ai/models';
import { getChatById, getMessagesByChatId } from '@/lib/db/queries/chat';
import { DBMessage } from '@/lib/db/schema';
import { Attachment, UIMessage } from 'ai';
import { notFound } from 'next/dist/client/components/not-found';

import { redirect } from 'next/navigation';

export default async function LessonChat({ lessonId }: { lessonId: string }) {


    const id = "6c522403-363d-45f9-8281-6c61484d1358";

    const chat = await getChatById({ id });

    if (!chat) {
        notFound();
    }

    const session = await auth();

    if (!session) {
        redirect('/api/auth/guest');
    }

    if (chat.visibility === 'private') {
        if (!session.user) {
            return notFound();
        }

        if (session.user.id !== chat.userId) {
            return notFound();
        }
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
                id={chat.id}
                initialMessages={convertToUIMessages(messagesFromDb ?? [])}
                initialChatModel={DEFAULT_CHAT_MODEL}
                initialVisibilityType={chat.visibility}
                isReadonly={session?.user?.id !== chat.userId}
                session={session}
                autoResume={true}
            />
            <DataStreamHandler id={id} />
        </>


    )
}