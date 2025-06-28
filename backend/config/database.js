
const mongoose = require('mongoose');

async function main(){
    await  mongoose.connect(process.env.URL)}

module.exports = main;