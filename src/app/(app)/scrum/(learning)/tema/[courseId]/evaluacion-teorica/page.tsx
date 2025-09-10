import { getLessionById, getTopicById } from "@/lib/db/queries/learning";
import ClientPage from "./client";

interface TopicPageProps {
    params: Promise<{
        topicId: string;
        courseId: string;
    }>;
}

export default async function page({ params }: TopicPageProps) {

    const { topicId, courseId } = await params;


    const topic = await getTopicById(courseId);

    if (!topic) {
        return <h1>Lesson not found</h1>
    }

    return (
        <ClientPage topic={topic} />
    )
}
