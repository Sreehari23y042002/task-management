const { verifyToken, isAdmin, isModerator } = require("../middlewares/authJwt");
const controller = require("../controllers/user.controller");
const route = require("express").Router();

route.get("/all", controller.allAccess);

route.get("/user", verifyToken, controller.userBoard);

route.get("/mod", [verifyToken, isModerator], controller.moderatorBoard);

route.get("/admin", [verifyToken, isAdmin], controller.adminBoard);

route.get("/users", [verifyToken, isAdmin], controller.listUser);

route.put('/updateUser/:id', [verifyToken, isAdmin], controller.updateUser)

route.delete('/deleteUser/:id', [verifyToken, isAdmin], controller.deleteUser)

route.post('/tasks', [verifyToken], controller.taskUpload)

route.get('/emails', [verifyToken], controller.assignTask)

route.get('/tasks/employee', [verifyToken], controller.getTaskStatus)

route.get('/tasks/employees', [verifyToken], controller.getTasksByEmployeeEmail)

route.patch('/tasks/:taskId', [verifyToken], controller.taskDetailsUpdate)

route.get('/alltasks', [verifyToken], controller.getAllTask)

route.get('/allusers', [verifyToken], controller.listUsersByRole)


route.put('/updateUsers/:id', [verifyToken], controller.updateUsers)


// route.get('/user', [verifyToken,isAdmin], controller.allUser)


module.exports = route;
