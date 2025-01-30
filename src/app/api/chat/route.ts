import { NextRequest } from 'next/server';
import OpenAI from 'openai';

// export const runtime = 'edge';

// Initialize the OpenAI client with custom base URL
const openai = new OpenAI({
  apiKey: process.env.API_KEY,
  baseURL: process.env.API_URL,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const stream = await openai.chat.completions.create({
      model: process.env.MODEL!,
      messages: [
        { role: 'system', content: 'You are a helpful assistant. Always return using Markdown. Add new lines to separate subjects.' },

        { role: 'user', content: message },
      ],
      stream: true,
    });

    // Create a new ReadableStream that will handle the streaming response
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            // Get the delta content from the chunk
            const content = chunk.choices[0]?.delta?.content || '';

            // Create a proper SSE message
            if (content) {
              const sseMessage = `data: ${JSON.stringify({ content })}\n\n`;
              const encoder = new TextEncoder();
              controller.enqueue(encoder.encode(sseMessage));
            }
          }
          // Send the [DONE] message when the stream is complete
          controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Error streaming response:', error);
          controller.error(error);
        }
      },
    });

    // Return the response with proper headers
    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'X-Accel-Buffering': 'no',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    if (error instanceof OpenAI.APIError) {
      return new Response(
        JSON.stringify({
          error: error.message,
          code: error.code,
          type: error.type,
        }),
        {
          status: error.status || 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
