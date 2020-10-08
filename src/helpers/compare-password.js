const bcrypt = require('bcrypt');

module.exports = async (password, hash) => {
 const comparePassword = await bcrypt.compare(password, hash);
 return comparePassword;
}
