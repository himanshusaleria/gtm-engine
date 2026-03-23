/**
 * Call Recording API Integration (Optional)
 *
 * Helper functions for interacting with call recording provider APIs.
 * The /sync-calls skill uses curl directly, but this file can be used
 * for custom integrations or batch processing.
 *
 * Supported providers:
 * - Fathom: https://fathom.video/api (X-Api-Key auth)
 * - Fireflies: https://api.fireflies.ai/graphql (Bearer auth)
 */

// --- Fathom ---

const FATHOM_API_BASE = "https://api.fathom.ai/external/v1";

interface FathomMeeting {
  recording_id: string;
  title: string;
  created_at: string;
  share_url: string;
  calendar_invitees: Array<{
    display_name: string;
    email: string;
  }>;
}

interface FathomTranscript {
  segments: Array<{
    speaker: { display_name: string };
    timestamp: string;
    text: string;
  }>;
}

async function fetchFathomMeetings(
  apiKey: string,
  limit: number = 20,
  createdAfter?: string
): Promise<FathomMeeting[]> {
  const params = new URLSearchParams({ limit: limit.toString() });
  if (createdAfter) {
    params.set("created_after", createdAfter);
  }

  const response = await fetch(`${FATHOM_API_BASE}/meetings?${params}`, {
    headers: { "X-Api-Key": apiKey },
  });

  if (!response.ok) {
    throw new Error(`Fathom API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function fetchFathomTranscript(
  apiKey: string,
  recordingId: string
): Promise<FathomTranscript> {
  const response = await fetch(
    `${FATHOM_API_BASE}/recordings/${recordingId}/transcript`,
    { headers: { "X-Api-Key": apiKey } }
  );

  if (!response.ok) {
    throw new Error(`Fathom API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function fetchFathomSummary(
  apiKey: string,
  recordingId: string
): Promise<string | null> {
  const response = await fetch(
    `${FATHOM_API_BASE}/recordings/${recordingId}/summary`,
    { headers: { "X-Api-Key": apiKey } }
  );

  if (!response.ok) return null;
  return response.text();
}

// --- Fireflies ---

const FIREFLIES_API_BASE = "https://api.fireflies.ai/graphql";

interface FirefliesTranscript {
  id: string;
  title: string;
  date: string;
  duration: number;
  organizer_email: string;
  participants: string[];
  sentences: Array<{
    speaker_name: string;
    text: string;
  }>;
}

async function fetchFirefliesTranscripts(
  apiKey: string
): Promise<FirefliesTranscript[]> {
  const query = `{ transcripts { id title date duration organizer_email participants sentences { speaker_name text } } }`;

  const response = await fetch(FIREFLIES_API_BASE, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Fireflies API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.data.transcripts;
}

export { fetchFathomMeetings, fetchFathomTranscript, fetchFathomSummary, fetchFirefliesTranscripts };
export type { FathomMeeting, FathomTranscript, FirefliesTranscript };
