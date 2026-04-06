import type { User } from "../types/user";

const API = import.meta.env.VITE_API_URL;

type Params = {
    userId: string;
};

type Credentials = {
    t: string; 
};

const create = async (user: User) => {
    try {
        const response = await fetch(`${API}/api/users/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const list = async (signal: AbortSignal) => {
    try {
        const response = await fetch(`${API}/api/users/`, {
            method: 'GET',
            signal: signal,
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const read = async (params: Params, credentials: Credentials, signal: AbortSignal) => {
    try {
        const response = await fetch('/api/users/' + params.userId, {
            method: 'GET',
            signal: signal,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + credentials.t
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}


export { create, list, read }


