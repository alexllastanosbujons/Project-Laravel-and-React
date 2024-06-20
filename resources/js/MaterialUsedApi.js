const API_URL = "http://localhost/api";


export function store(data) {
    return fetch(`${API_URL}/storeMaterialUsed`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

export function getMaterialUsedsByProjectId(id) {
    return fetch(`${API_URL}/getMaterialUsedByProjectId/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

export function destroyMaterialUsed(id) {
    return fetch(`${API_URL}/deleteMaterialUsed/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}


