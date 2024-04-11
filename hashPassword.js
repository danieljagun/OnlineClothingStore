const bcrypt = require('bcryptjs');
const password = "PASSWORD"; // Replace with the password you want to hash
const hashedPassword = bcrypt.hashSync(password, 10);
console.log(hashedPassword);
