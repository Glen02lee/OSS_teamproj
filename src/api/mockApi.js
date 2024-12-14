const MOCK_API_URL = "https://6749b320868020296632377a.mockapi.io/api/v1/sets";

// Create
export const saveSetToMockApi = async (set) => {
  try {
    const response = await fetch(MOCK_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(set),
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to save set:", error);
  }
};

// Read
export const fetchSetsFromMockApi = async () => {
  try {
    const response = await fetch(MOCK_API_URL);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch sets:", error);
    return [];
  }
};

// Update
export const updateSetOnMockApi = async (id, updatedSet) => {
  try {
    const response = await fetch(`${MOCK_API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSet),
    });
    return await response.json();
  } catch (error) {
    console.error("Failed to update set:", error);
  }
};

// Delete
export const deleteSetFromMockApi = async (id) => {
  try {
    await fetch(`${MOCK_API_URL}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Failed to delete set:", error);
  }
};
