const API_URL = "http://localhost/api";


export function store(data) {
    return fetch(`${API_URL}/storeHour`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}

export function getHoursByProjectId(id) {
    return fetch(`${API_URL}/getHoursByProjectId/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}

export async function getHourByUserId(id, data) {
    return fetch(`${API_URL}/getHourByUserId/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((response) => response.json());
}



export function destroyHour(id) {
    return fetch(`${API_URL}/deleteHour/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => response.json());
}





