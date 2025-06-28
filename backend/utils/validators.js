const validator = require('validator');

function validateuser (data) {
 
    const mendatoryFields = ['name', 'email','password'];
    const isvalied = mendatoryFields.every((field) => {
        return data[field] !== undefined && data[field] !== null && data[field] !== ''; // check if the field is not undefined, null or empty string
    })
    // const isvalied = mendatoryFields.every( (field) => Object.keys(data).includes(field) )
    if(!isvalied){
        throw new Error('missing mendatory fields');
        
    }
    if (!validator.isEmail(data.email)) {
        throw new Error('Invalid email format');
    }
    if(data.password.length < 6 || data.password.length > 20) {  {
        throw new Error('password must be at least 6 characters long or at most 20 characters long'); 
    }
    

}
}

module.exports = validateuser;

