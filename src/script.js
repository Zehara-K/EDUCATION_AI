const API_URL = import.meta.env.VITE_API_URL;

// ===================== AUTH =====================
export async function register(username, password) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
}

export async function login(username, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    return res.json();
}

// ===================== TASKS =====================
export async function getTasks(token) {
    const res = await fetch(`${API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

export async function addTask(taskData, token) {
    const res = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
    });
    return res.json();
}

export async function deleteTask(id, token) {
    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

export async function toggleTask(id, token) {
    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.json();
}

// ===================== OTHER FEATURES =====================
export async function generatePlanner(data, token) {
    const res = await fetch(`${API_URL}/api/ai/planner`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function studyAssistant(topic, token) {
    const res = await fetch(`${API_URL}/api/ai/study`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topic }),
    });
    return res.json();
}

export async function chatAPI(message, token) {
    const res = await fetch(`${API_URL}/api/ai/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, history: [] }),
    });
    return res.json();
}

export async function updateAvatar(avatar, token) {
    const res = await fetch(`${API_URL}/api/ai/update-avatar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ avatar }),
    });
    return res.json();
}