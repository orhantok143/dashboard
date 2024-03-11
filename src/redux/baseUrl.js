export const baseURL = "https://back-end-qowh.onrender.com/api/v1"

export const headers = {
    // CORS configuration settings
    headers: {
        'Content-Type': 'application/json', // Assuming JSON data
        'Access-Control-Allow-Origin': 'https://flamingodb.netlify.app, https://flamingo-mn.netlify.app',
    },
    withCredentials: true, // Send credentials (if applicable)
}
