module.exports = function isAuthorizedUser(userRole, userEmployeeId, targetEmployeeId) {
    return userRole !== 'user' ? true : userEmployeeId === targetEmployeeId;
}