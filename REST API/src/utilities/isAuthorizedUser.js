module.exports = function isAuthorizedUser(userRole, userEmployeeId, targetEmployeeId) {
    return userRole !== 'user' ? true : userEmployeeId?.toString() === targetEmployeeId?.toString();
}