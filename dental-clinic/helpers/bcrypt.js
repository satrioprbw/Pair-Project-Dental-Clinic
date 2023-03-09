const bcrypt = require('bcryptjs');

module.exports= {
    hashPassword : (password)=>{
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(password, salt);
        return hash
    },
    comparePassword : (input,password) => {
        const compare = bcrypt.compareSync(input, password);
        return compare
    }
}