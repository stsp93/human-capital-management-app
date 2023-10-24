const { REST_API_URL } =require("../config/constants") ;

class Requester {
    async request(method, path, payload, token) {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        if (token) {
            options.headers['JWT-Auth'] = token;
        }
        if (payload !== undefined) {
            options['body'] = JSON.stringify(payload);
        }

            const res = await fetch(REST_API_URL + path, options);
    
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.errors);
            }
    
            if (res.status === 204) {
                return res;
            }
            const data = await res.json()
            return data;
    
    }

    getReq(path, token) {
       return this.request('GET', path, token);
    }
    postReq(path, payload, token) {
       return this.request('POST', path, payload, token);
    }
    putReq(path, payload, token) {
       return this.request('PUT', path, payload, token);
    }
    deleteReq(path, payload, token) {
       return this.request('DELETE', path, payload, token);
    }
}

module.exports = Requester;