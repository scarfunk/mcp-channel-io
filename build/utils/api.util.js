const API_BASE_URL = "https://api.channel.io";
// Helper function for making OpenAPI API requests
export async function makeOpenApiRequest(path, accessKey, secretKey) {
    const headers = {
        "Content-Type": "application/json",
        "x-access-key": accessKey,
        "x-access-secret": secretKey,
    };
    const url = `${API_BASE_URL}${path}`;
    try {
        const response = await fetch(url, { headers, method: "GET" });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = (await response.json());
        return data;
    }
    catch (error) {
        console.error("Error making API request:", error);
        return null;
    }
}
