const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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

export const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error('Network response was not ok');
    return await res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const askAiAdvisor = async (question, lang, productId) => {
  try {
    const res = await fetch(`${API_URL}/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question, lang, productId })
    });
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  } catch (error) {
    console.error("Error asking AI:", error);
    throw error;
  }
};
