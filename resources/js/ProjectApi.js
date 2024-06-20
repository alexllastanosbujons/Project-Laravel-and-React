const API_URL = "http://localhost/api";


export function store(data) {
    return fetch(`${API_URL}/storeProject`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

export function getProjectById(id) {
    return fetch(`${API_URL}/getProjectById/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

export function destroyProject(id) {
    return fetch(`${API_URL}/deleteProject/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}


export function update (id,data){
    return fetch(`${API_URL}/updateProject/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

export function projectFinished(id) {
    return fetch(`${API_URL}/projectFinished/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}


