const API_URL = 'http://localhost:5000/api';

export const fetchProduct = async () => {
  try {
    const res = await fetch(`${API_URL}/product`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const askAiAdvisor = async (question, lang) => {
  try {
    const res = await fetch(`${API_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question, lang })
    });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (error) {
    console.error("Error asking AI:", error);
    throw error;
  }
};
