const API_URL = "http://localhost/api";


export function store(data) {
    return fetch(`${API_URL}/storeProveidor`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

export function getProveidors() {
    return fetch(`${API_URL}/getProveidors`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

export function destroyProveidor(id) {
    return fetch(`${API_URL}/deleteProveidor/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}
export function getProveidor(id) {
    return fetch(`${API_URL}/getProveidor/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

export function updateProveidor(id, data) {
    return fetch(`${API_URL}/updateProveidor/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}


