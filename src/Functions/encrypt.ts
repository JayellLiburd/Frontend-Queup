import crypto from 'crypto';

const encryption = crypto.sign('sha256', crypto.randomBytes(16), 'encrypted data');
console.log(encryption);