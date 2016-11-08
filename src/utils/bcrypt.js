import Promise from 'bluebird';
import bcrypt from 'bcrypt';

export default Promise.promisifyAll(bcrypt);
