const checkEmptyFields = (inputObj) => {
   if(Object.values(inputObj).some(v => v === '')) {
    throw new Error('Fill all fields');
   }
}

module.exports = {
    checkEmptyFields
}