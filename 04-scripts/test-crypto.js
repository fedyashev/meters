const crypt = require('../01-server/lib/crypt');

const pass = 'P@ssw0rd';

crypt.getPasswordHash(pass)
    .then(hash => {
        console.log(hash);

        const samePass = 'Password';

        crypt.comparePassword(samePass, hash)
            .then(result => {
                if (result) {
                    console.log("Match!");
                }
                else {
                    console.log("Not match!");
                }
            })
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));