//Import Models
// TODO add models
const res = require('express/lib/response');

const getClinicianDash = async(req, res, next) => {
    try {
        // TODO Add DB call and actual HRB render here, eg:
        // const patientData = await ....
        // return res.render('clinicianDash', { data: ... });
        return res.render('clinicianDash');
    } catch (err) {
        return next(err)
    }
}



module.exports = {
    getClinicianDash,
}