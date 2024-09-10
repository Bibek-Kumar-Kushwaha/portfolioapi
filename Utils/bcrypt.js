import bcrypt from 'bcrypt';

const encryptPassword = async (plainPassword, saltRounds) => {
  try {

    const hash = await bcrypt.hash(plainPassword, saltRounds);
    return hash;
  } catch (err) {
    console.error(err);
  }
};

export default encryptPassword;
