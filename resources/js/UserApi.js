const API_URL = "http://localhost/api";



export function getUsers() {
    return fetch(`${API_URL}/getUsers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

export function destroyUser(id) {
    return fetch(`${API_URL}/deleteUser/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

export function getUserById(id) {
    return fetch(`${API_URL}/getUserById/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

export function updateUser(id, data) {
    return fetch(`${API_URL}/updateUser/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

export function store(data) {
    return fetch(`${API_URL}/storeUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

export function updateAdminState(id) {
    return fetch(`${API_URL}/updateAdminState/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}






