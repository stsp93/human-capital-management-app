const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/Immedis_internship_2023_hcm';
const PORT = 3000;
const JWT_SECRET = '912hrn9 N)& N70 *12o1928n9@) U@';

const QUERY_DEFAULTS = {
    page: 1,
    limit: 5,
    sort: '_id',
    order: 'asc',
    search: '',
}

module.exports = {
    CONNECTION_STRING,
    PORT,
    JWT_SECRET,
    QUERY_DEFAULTS
}
