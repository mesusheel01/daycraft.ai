

// ai request
export const fetchAiRequest = async (prompt: string) => {
  try {
    const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if(!response?.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      console.log(data);
      return data;
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
}

