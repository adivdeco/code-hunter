
const mongoose = require('mongoose');

async function main() {
    await mongoose.connect(process.env.URl)
}

module.exports = main;