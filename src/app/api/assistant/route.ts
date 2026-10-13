import { NextRequest, NextResponse } from "next/server";
import { processAssistantQuery } from "@/services/assistantService";
import { AssistantApiRequest, AssistantApiResponse } from "@/types/assistant";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AssistantApiRequest;
    const query = body?.query?.trim();

    if (!query) {
      return NextResponse.json(
        {
          error: "Query parameter cannot be empty.",
          code: "INVALID_REQUEST",
        },
        { status: 400 }
      );
    }

    // Process query via server-side modular assistant service
    // Future server-side LLM calls (e.g. Gemini 2.0 API) execute here securely with process.env.GEMINI_API_KEY
    const result: AssistantApiResponse = await processAssistantQuery(
      query,
      body.history as Parameters<typeof processAssistantQuery>[1]
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error occurred.";
    return NextResponse.json(
      {
        error: "Failed to process pilgrimage assistant request.",
        details: message,
        code: "ASSISTANT_EXECUTION_ERROR",
      },
      { status: 500 }
    );
  }
}
