const express = require("express");
const router = express.Router();
const path = require("path");
const employeeController = require("../../controllers/employees.controller.js");
const ROLES_LIST = require("../../config/roles_list.js");
const verifyRoles = require("../../middleware/verifyRoles.js");
//adding middleware to verfy
const verfiJWT = require("../../middleware/verifyJwt.js");
router
  .route("/")
  // .get(verfiJWT, employeeController.getAllEmployees)
  .get(employeeController.getAllEmployees)
  .post(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeeController.createNewEmployee
  )
  .put(
    verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),
    employeeController.updateEmployee
  )
  .delete(verifyRoles(ROLES_LIST.Admin), employeeController.deleteEmployee);

router.route("/:id").get(employeeController.getEmployee);
module.exports = router;
