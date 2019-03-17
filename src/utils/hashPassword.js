import bcrypt from 'bcryptjs'

const hashPassword = (password) => {
    if(password.length < 8){
        throw new Error('Password must be 8 characters or longer.')
    }
    const pass = bcrypt.hash(password, 10)
    console.log(pass)
    return pass
}

export { hashPassword as default }