import type { User } from "../types/user";

const API = import.meta.env.VITE_API_URL;

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

export { create }
