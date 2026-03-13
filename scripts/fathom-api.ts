/**
 * Fathom API Integration (Optional)
 *
 * This script provides helper functions for interacting with the Fathom API.
 * The /fathom-calls skill uses curl directly, but this file can be used
 * for custom integrations or batch processing.
 *
 * API Docs: https://fathom.video/api
 * Auth: X-Api-Key header with your API key from .env
 */

const API_BASE = "https://api.fathom.ai/external/v1";

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

/**
 * Fetch recent meetings from Fathom
 */
async function fetchMeetings(
  apiKey: string,
  limit: number = 20,
  createdAfter?: string
): Promise<FathomMeeting[]> {
  const params = new URLSearchParams({ limit: limit.toString() });
  if (createdAfter) {
    params.set("created_after", createdAfter);
  }

  const response = await fetch(`${API_BASE}/meetings?${params}`, {
    headers: { "X-Api-Key": apiKey },
  });

  if (!response.ok) {
    throw new Error(`Fathom API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch transcript for a specific recording
 */
async function fetchTranscript(
  apiKey: string,
  recordingId: string
): Promise<FathomTranscript> {
  const response = await fetch(
    `${API_BASE}/recordings/${recordingId}/transcript`,
    { headers: { "X-Api-Key": apiKey } }
  );

  if (!response.ok) {
    throw new Error(`Fathom API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch summary for a specific recording
 */
async function fetchSummary(
  apiKey: string,
  recordingId: string
): Promise<string | null> {
  const response = await fetch(
    `${API_BASE}/recordings/${recordingId}/summary`,
    { headers: { "X-Api-Key": apiKey } }
  );

  if (!response.ok) return null;
  return response.text();
}

export { fetchMeetings, fetchTranscript, fetchSummary };
export type { FathomMeeting, FathomTranscript };
