import { REST_API_HOST } from "../../config/constants";


async function request(method, url, payload, session) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (session) {
        const token = session.token;
        options.headers['JWT-Auth'] = token;
    }
    if (payload !== undefined) {
        options['body'] = JSON.stringify(payload);
    }

    try {
        const res = await fetch(REST_API_HOST + url, options);

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.errors)
        }

        if (res.status === 204) {
            return res;
        }
        const data = await res.json()
        return data;

    } catch (err) {
        console.error(err);
        throw err;
    }
}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export {
    get,
    post,
    put,
    del
}