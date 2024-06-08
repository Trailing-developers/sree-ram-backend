const axios = require("axios");
const { getCachedItem, cacheResponse } = require("./external_client_cache");

class FreeAstrologyClient {
  constructor(apiKey, baseUrl) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  getHeaders() {
    if (this.apiKey == null) {
      return {
        "Content-Type": "application/json",
      };
    }
    return {
      "Content-Type": "application/json",
      "x-api-key": this.apiKey,
    };
  }

  async get(endpoint) {
    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(endpoint, data, key) {
    try {
      const cache = await getCachedItem(key);
      if (cache != null) {
        return cache.response;
      }
      const response = await axios.post(`${this.baseUrl}${endpoint}`, data, {
        headers: this.getHeaders(),
      });
      await cacheResponse(key, endpoint, response.data);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
}

module.exports = FreeAstrologyClient;
