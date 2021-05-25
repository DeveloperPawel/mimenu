import express from "express";

const router = express.Router();

import {
  register,
  createPatient,
  createIngredient,
  createMenuItem,
  createDiet,
  getAllPatients,
  getAllIngredients,
  getAllMenuItems,
  createCalendar,
  getAllCalendars,
  getAllDiet,
  deletePatient,
  deleteIngredient,
  deleteMenuItem,
  deleteDiet,
  deleteCalendar,
  updatePatient,
  updateIngredient,
  updateMenuItem,
  updateDiet,
  updateCalendar,
  createDay,
  getAllDays,
  getOneDay,
  deleteDay,
  updateDay,
  getOnePatient,
  login,
} from "../functions/index";

router.post("/login", login);

router.post("/register", register);

router.post("/addpatient", createPatient);
router.get("/getallpatients", getAllPatients);
router.delete("/deletepatient/:id", deletePatient);
router.post("/updatepatient/:id", updatePatient);
router.get("/getonepatient/:id", getOnePatient);

router.post("/addingredient", createIngredient);
router.get("/getallingredients", getAllIngredients);
router.delete("/deleteingredient/:id", deleteIngredient);
router.post("/updateingredient/:id", updateIngredient);

router.post("/addmenuitem", createMenuItem);
router.get("/getallmenuitems", getAllMenuItems);
router.delete("/deletemenuitem/:id", deleteMenuItem);
router.post("/updatemenuitem/:id", updateMenuItem);

router.post("/adddiet", createDiet);
router.get("/getalldiet", getAllDiet);
router.delete("/deletediet/:id", deleteDiet);
router.post("/updatediet/:id", updateDiet);

router.post("/addcalendar", createCalendar);
router.get("/getallcalendars", getAllCalendars);
router.delete("/deletecalendar/:id", deleteCalendar);
router.post("/updatecalendar/:id", updateCalendar);

router.post("/addday", createDay);
router.get("/getalldays", getAllDays);
router.delete("/deleteday/:id", deleteDay);
router.post("/updateday/:id", updateDay);
router.get("/getoneday/:id", getOneDay);

module.exports = router;

// update patient Menu Orders
// update patient order status
