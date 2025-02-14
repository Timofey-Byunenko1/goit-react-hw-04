import axios from "axios";

const API_KEY = "5hYqS-8aDLoyMrlyT4K3Fg5UwXaH1MsL3Sp9LLAU-kI";
const API_URL = "https://api.unsplash.com/search/photos";

const fetchPictures = async (query, page) => {
  if (!query.trim()) {
    return [];
  }

  try {
    const response = await axios.get(API_URL, {
      params: {
        query: query,
        client_id: API_KEY,
        per_page: 16,
        page,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error(
      "Error fetching images:",
      error.response?.data || error.message
    );

    throw new Error("Failed to fetch pictures");
  }
};

export default fetchPictures;
