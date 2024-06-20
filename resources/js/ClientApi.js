const API_URL = "http://localhost/api";


export function store(data) {
    return fetch(`${API_URL}/storeClient`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

export function update(id, data) {
    return fetch(`${API_URL}/updateClient/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}


export function destroyClient(id) {
    return fetch(`${API_URL}/deleteClient/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

export function getClients() {
    return fetch(`${API_URL}/getClients`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

export function getClientById(id) {
    return fetch(`${API_URL}/getClientById/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}



