const API_URL = "http://localhost/api";


export function store(data) {
    return fetch(`${API_URL}/storeMaterial`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

export function getAllMaterials() {
    return fetch(`${API_URL}/getMaterials`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

export function destroyMaterial(id) {
    return fetch(`${API_URL}/deleteMaterial/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

export function getMaterialById(id) {
    return fetch(`${API_URL}/getMaterialById/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

export function updateMaterial(id, data) {
    return fetch(`${API_URL}/updateMaterial/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

export function update (id, data) {
    return fetch(`${API_URL}/updateMaterial/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}


