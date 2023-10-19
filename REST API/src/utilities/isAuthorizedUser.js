module.exports = function isAuthorizedUser(userEmployeeId, targetEmployeeId) {
    return userRole !== 'user' ? true : userEmployeeId === targetEmployeeId;
}