const express = require("express");
const { model } = require("mongoose");
const {
  getChecklists,
  createChecklist,
  getChecklistById,
  updateChecklist,
  deleteChecklist,
  copyChecklist,
} = require("../controllers/checklistController");

const router = express.Router();

router.route("/").get(getChecklists);
router.route("/create").post(createChecklist);
router
  .route("/:id")
  .get(getChecklistById)
  .put(updateChecklist)
  .delete(deleteChecklist);
router.route("/copy/:id").get(copyChecklist);

module.exports = router;
