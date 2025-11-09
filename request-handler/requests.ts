

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
    const res = await fetch('/api/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "cookie": document.cookie,
        },
        credentials: 'include',
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`);
      }
      const getTodo = await fetch('/api/task', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "cookie": document.cookie,
          // Example user ID header
        },
        credentials: 'include',
      });

      if (!getTodo.ok) {
        throw new Error(`Error: ${getTodo.statusText}`);
      }
      const data = await getTodo.json();
      console.log("AI Response Data:", data);
      return data;
      // call post todo to set the current todo to the database too.
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error;
  }
}

