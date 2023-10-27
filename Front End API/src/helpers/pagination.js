const toQueryString = (query) => Object.entries(query).map(q => q[0] + '=' + q[1]).join('&');

// Converts next/prevPage numbers to query str and attach it to the fetch result
 function attachPaginationHrefs(entities, query) {
    if (entities.nextPage) {
        query.page = entities.nextPage
        entities.nextPage = toQueryString(query);
    }
    if (entities.prevPage) {
        query.page = entities.prevPage
        entities.prevPage = toQueryString(query);
    }
}

module.exports = {
    attachPaginationHrefs,
    toQueryString
}