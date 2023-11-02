class Controller {
    constructor() {
        this.leaveService = require('../services/leaveService');
        this.employeeService = require('../services/employeeService');
    }

    setPageIfNotProvided = (query) => {
        if (!query.page) {
            query.page = 1;
        }
    }

    renderList = (res, view, data) => {
        res.render(`tables/${view}`,  data );
    }

    renderView = (res, view, data) => {
        res.render(`details/${view}`, data);
    }

    renderForm = (res, view, data) =>{
        res.render(`forms/${view}`, data);
    }

    handleError = (res, view, error, data) => {
        console.log(error);
        res.render(`tables/${view}`, { error, ...data });
    }
}

module.exports = Controller;