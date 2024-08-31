import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Ensure this runs at the Edge for low-latency

export async function POST(req: Request) {
    try {
      const prompt =
        "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment. Also make sure your every output at each api call is different";
  
      // Use the Vercel AI SDK to stream a response from the Gemini model
      const result = await streamText({
        model: google('gemini-1.5-flash-latest'), // Specify the Gemini model
        prompt, // Pass the prompt
        maxTokens: 400, // Limit the tokens (adjust according to your needs)
        temperature: 1,
        topP: 0.9
      });
  
      // Return the streamed response
      return result.toDataStreamResponse();
    } catch (error) {
        console.log(error);
        throw error;
    }
  }
