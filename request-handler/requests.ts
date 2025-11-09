

// // ai request
// export const fetchAiRequest = async (prompt: string) => {
//   try {
//     const res = await fetch('/api/ai', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt }),
//       });

//       if (!res.ok) {
//         throw new Error(`Error: ${res.statusText}`);
//       }

//       const data = await res.json();
//       console.log("AI Response Data:", data);
//       return data;
//       // call post todo to set the current todo to the database too.
//   } catch (error) {
//     console.error("Error fetching AI response:", error);
//     throw error;
//   }
// }


// ai request
export const fetchAiRequest = async (prompt: string) => {
  try {
    // POST request
    const res = await fetch('/api/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // ✅ do NOT add cookie manually
      credentials: 'include', // ✅ send session cookie automatically
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    // GET request to fetch tasks
    const getTodo = await fetch('/api/task', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // ✅ send session cookie automatically
    });

    if (!getTodo.ok) {
      throw new Error(`Error: ${getTodo.statusText}`);
    }

    const data = await getTodo.json();
    console.log("AI Response Data:", data);
    return data;

  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
}
  