const bcrypt = require('bcrypt');

module.exports = async (password) => {
  const hashPassword =  await bcrypt.hash(password, 10);
  return  hashPassword
};
