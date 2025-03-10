const express = require("express");
const {updateSupervisorById} = require("../Supervisor/updatesupervisor")
const {getSupervisorById} = require("../Supervisor/getSupervisor")

const {
  evaluateReport,
  getAssignedReports,
} = require("../Supervisor/EvaluationReports");
const { registerSupervisor } = require("../Supervisor/addSupervisor");
const { loginSupervisor } = require("../Supervisor/loginSupervisor");
const { getAllSupervisor } = require("../Supervisor/getallSupervisor");

const router = express.Router();

router.post("/evaluate-report", evaluateReport);
router.get("/assigned-reports/:supervisorId", getAssignedReports);
router.post("/addSupervisor",registerSupervisor);
router.post("/login",loginSupervisor)
router.put("/supervisorProfile/:id",updateSupervisorById)
router.get("/supervisorProfile/:id",getSupervisorById)
router.get("/all",getAllSupervisor)


module.exports = router;
