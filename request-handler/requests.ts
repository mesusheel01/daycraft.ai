

// ai request
export const fetchAiRequest = async (prompt: string) => {
  try {
    const res = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("AI Response Data:", data);
      return data;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
}

