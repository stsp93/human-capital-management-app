const queryString = (query) => Object.entries(query).map(q => q[0] + '=' + q[1]).join('&');

// Converts next/prevPage numbers to query str and attach it to the fetch result
 function attachPaginationHrefs(entities, query) {
    if (entities.nextPage) {
        query.page = entities.nextPage
        entities.nextPage = queryString(query);
    }
    if (entities.prevPage) {
        query.page = entities.prevPage
        entities.prevPage = queryString(query);
    }
}

module.exports = {
    attachPaginationHrefs
}