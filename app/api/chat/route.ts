import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { getSystemPrompt } from '@/lib/context';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const { messages } = await req.json();
        console.log('API /api/chat received messages:', messages.length);

        const result = streamText({
            model: google('gemini-1.5-flash'),
            system: getSystemPrompt(),
            messages,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('API /api/chat error:', error);
        return new Response(JSON.stringify({ error: 'Failed to process chat' }), { status: 500 });
    }
}
