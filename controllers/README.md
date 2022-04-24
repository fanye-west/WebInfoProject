# Controllers

These JS scripts and their functions manage the retreival of data from the database and rendering of the page.

This seperates these functions from the route definitions, which are kept very simple.

### Example
Based heavily on Tutorial 7

#### Example functions in a conroller
```
const User = require('../models/author')

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().lean()
        return res.render('getUserDataPage', {data: users})
    } catch (err) {
        return next(err)
    }
}
```

#### Use of the controller in routes
```
const userRouter = express.Router()

// import controller functions
const controller = require('../controllers/userController')

// Add endpoints
userRouter.get('/', controller.getAllUsers)
userRouter.post('/', controller.addData)

// export the router
module.exports = userRouter
```