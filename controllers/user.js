
const User = require('../models/user')
const bcrypt = require('bcrypt')

const addUser = async(req, res) => {
    const { username, emailAddress, password} = req.body
    const saltRounds = 10
    // const salt = bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hashSync(password, saltRounds)
    try{
    const newUser = new User({
        username : username,
        emailAddress: emailAddress,
        password: hashedPassword
      })
      await newUser.save()
      res.send("User created succcessfully")
      console.log(newUser)
    }
    catch(err){
        console.log(err)
    }
}

const getUser = async (req, res) => {
    const { emailAddress, password } = req.body
    try{
    const savedUser = await User.findOne({ emailAddress })
    const check = bcrypt.compareSync(password, savedUser.password)
    if(!savedUser){
        res.send("User cannot be found")
    }
    if(check){
        res.send("Welcome " + savedUser.username)
        console.log(savedUser)
    }
    else{
        res.send("Invalid credentials")
    }
    }
    catch(err){
        console.log(err)
    }
}


module.exports = { addUser, getUser }