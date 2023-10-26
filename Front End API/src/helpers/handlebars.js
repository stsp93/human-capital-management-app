function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }

  function requireAdmin(role, options) {
    return role === 'admin' ? options.fn(this) : options.inverse(this);
  }

  function requireManager(role, options) {
    return role === 'admin' || role ==='manager' ? options.fn(this) : options.inverse(this);
  }

  function leaveNotResolved(status, options) {
    return status === 'pending' ? options.fn(this) : options.inverse(this);
  }


module.exports = {
    formatDate,
    requireAdmin,
    requireManager,
    leaveNotResolved
}