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
  
// get todos default
export const getTodos = async () => {
  try {
    const res = await fetch('/api/task', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // ✅ send session cookie automatically
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("Fetched Todos:", data);
    return data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}

//update particular task
export const updateParticularTask = async (id: number, newTask: string) => {
  try {
    const res = await fetch(`/api/task/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: newTask }),
      credentials: 'include', // ✅ send session cookie automatically
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating particular task:", error);
    throw error;
  }
}

// update mark completed
export const updateTodo = async (id: number, completed: boolean) => {
  try {
    const res = await fetch(`/api/task/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // ✅ send session cookie automatically
      body: JSON.stringify({ completed: completed }),
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating todo:", error);

  }
}


// delete todos and fetch new
export const deleteTodosAndFetchNew = async (prompt: string) => {
  try {
    // DELETE request to remove all todos
    const deleteRes = await fetch('/api/task', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // ✅ send session cookie automatically
    });

    if (!deleteRes.ok) {
      throw new Error(`Error: ${deleteRes.statusText}`);
    }

    // After deletion, fetch new AI response
    const aiData = await fetchAiRequest(prompt);
    return aiData;

  } catch (error) {
    console.error("Error deleting todos and fetching new:", error);
    throw error;
  }
}

// clear all todos
export const clearAllTodos = async () => {
  try {
    const deleteRes = await fetch('/api/task', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // ✅ send session cookie automatically
    });

    if (!deleteRes.ok) {
      throw new Error(`Error: ${deleteRes.statusText}`);
    }
    return true;
  } catch (error) {
    console.error("Error clearing all todos:", error);
    throw error;
  }
}