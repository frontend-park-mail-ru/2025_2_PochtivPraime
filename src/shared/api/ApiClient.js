export class ApiClient {
    constructor(baseURL = 'http://89.208.208.203:8080/api') {
        this.baseURL = baseURL;
    }

    async request(path, options = {}) {
        const url = `${this.baseURL}${path}`;
        const response = await fetch(url, {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
            ...options,
        });
        if (!response.ok) {
            const text = await response.text();
            throw new Error(text || `HTTP ${response.status}`);
        }
        return response.json().catch(() => ({}));
    }

    get(path) {
        return this.request(path);
    }

    post(path, body) {
        return this.request(path, { method: 'POST', body: JSON.stringify(body) });
    }

    delete(path) {
        return this.request(path, { method: 'DELETE' });
    }
}
// const urlForLocalHost = 'http://localhost:8080/api';
export const apiClient = new ApiClient();