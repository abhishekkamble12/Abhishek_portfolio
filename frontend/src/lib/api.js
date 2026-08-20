const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Submit the contact form to the backend API.
 * @param {{ name: string, email: string, subject: string, message: string }} data
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function submitContact(data) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to send message. Please try again.");
  }

  return response.json();
}

/**
 * Ask the AI assistant a question about the portfolio.
 * @param {string} question
 * @returns {Promise<{ answer: string, sources: Array<{ type: string, id: string, title: string }> }>}
 */
export async function askAI(question) {
  const response = await fetch(`${API_URL}/api/ai/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "AI assistant is unavailable. Please try again.");
  }

  return response.json();
}

/**
 * Ask the AI assistant with streaming response (SSE).
 * Calls onToken(token) for each word, onMeta({sources, confidence}) for metadata,
 * and onDone() when complete.
 *
 * @param {string} question
 * @param {{ onToken: (token: string) => void, onMeta: (meta: object) => void, onDone: () => void, onError: (msg: string) => void }} callbacks
 * @returns {Promise<void>}
 */
export async function askAIStream(question, { onToken, onMeta, onDone, onError }) {
  const response = await fetch(`${API_URL}/api/ai/ask/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "AI assistant is unavailable. Please try again.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    // Process complete SSE events (delimited by \n\n)
    const events = buffer.split("\n\n");
    buffer = events.pop(); // Keep incomplete event in buffer

    for (const event of events) {
      if (!event.startsWith("data: ")) continue;
      try {
        const data = JSON.parse(event.slice(6));
        switch (data.type) {
          case "token":
            onToken(data.data);
            break;
          case "meta":
            onMeta(data.data);
            break;
          case "done":
            onDone();
            break;
          case "error":
            onError(data.data);
            break;
        }
      } catch {
        // Skip malformed JSON
      }
    }
  }

  // Process any remaining buffer
  if (buffer.startsWith("data: ")) {
    try {
      const data = JSON.parse(buffer.slice(6));
      if (data.type === "done") onDone();
    } catch {
      // Ignore
    }
  }
}
