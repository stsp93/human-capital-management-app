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
    return role !== 'user' ? options.fn(this) : options.inverse(this);
  }

  function leaveNotResolved(status, options) {
    return status === 'pending' ? options.fn(this) : options.inverse(this);
  }

  function generateOptions(values, selectedValue) {
    if(!values) return;
    const options = values.map(value => {
      const selected = value == selectedValue ? 'selected' : '';
      return `<option value="${value}" ${selected}>${value}</option>`;
    });

    return options.join('');
  }

  function generateNameOptions(data, selectedValue) {
    if(!data) return;
  const options = data?.map(obj => {
    const value = obj._id;
    const text = obj.name;
    const selected = value == selectedValue ? 'selected' : '';
    return `<option value="${value}" ${selected}>${text}</option>`;
  });
  return options?.join('');
}

  function inputDate(dateString) {
    if (!dateString) return '';
    return dateString.substring(0, 10);
  }

module.exports = {
    formatDate,
    requireAdmin,
    requireManager,
    leaveNotResolved,
    generateOptions,
    inputDate,
    generateNameOptions
}