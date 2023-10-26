module.exports = queryString = (query) => Object.entries(query).map(q => q[0] + '=' + q[1]).join('&');
