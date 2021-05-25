import User from "../models/users";
import Patient from "../models/patients";
import Ingredient from "../models/ingredients";
import MenuItem from "../models/menuitems";
import Diet from "../models/diet";
import Calendar from "../models/calendar";
import Day from "../models/days";

const mongoose = require("mongoose");

export const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { name, email, password, role } = req.body;
    const user = new User({
      name,
      email,
      password,
      role,
    });
    await user.save();
    return res.status(200).send("success");
  } catch (err) {
    console.error(err);
    return res.status(400).send("Error. Try again");
  }
};

export const createPatient = async (req, res) => {
  try {
    // console.log(req.body);
    const { id, password, endDate, restriction, menuOrders } = req.body;
    const patient = new Patient({
      id,
      password,
      endDate,
      restriction,
      menuOrders,
    });
    await patient.save();
    return res.status(200).send("success");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};

export const getAllPatients = (req, res) => {
  Patient.find({}, (err, patient) => {
    let patientMap = [];

    patient.forEach((patient) => {
      patientMap.push(patient);
    });
    res.send(patientMap);
  });
};

export const deletePatient = (req, res) => {
  const id = req.params.id;

  Patient.findByIdAndDelete(id, (err, patient) => {
    if (err) console.log(err);
    console.log("Successful deletion");
    return res.status(200).send("success");
  });
};

export const getOnePatient = async (req, res) => {
  const id = req.params.id;

  if (mongoose.Types.ObjectId.isValid(id)) {
    Patient.findById(id, (err, patient) => {
      if (err) console.log(err);
      // console.log("day: ", day);
      res.send(patient);
    });
  } else {
    return res.status(400).send("invalid address");
  }
};

export const updatePatient = async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(req.body);
    const { id, password, endDate, restriction, menuOrders } = req.body;
    const patient2 = new Patient({
      id,
      password,
      endDate,
      restriction,
      menuOrders,
    });

    console.log(JSON.stringify(req.body, null, 2));
    console.log(JSON.stringify(patient2, null, 2));

    Patient.findByIdAndDelete(_id, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });

    await patient2.save();

    return res.status(200).send(patient2._id);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};

export const createIngredient = async (req, res) => {
  try {
    console.log(req.body);
    const { name, image } = req.body;
    const ingredient = new Ingredient({ name, image });
    await ingredient.save();
    return res.status(200).send("success");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};

export const getAllIngredients = (req, res) => {
  Ingredient.find({}, (err, ingredient) => {
    let ingredientMap = [];

    ingredient.forEach((ingredient) => {
      ingredientMap.push(ingredient);
    });
    res.send(ingredientMap);
  });
};

export const deleteIngredient = (req, res) => {
  const id = req.params.id;

  Ingredient.findByIdAndDelete(id, (err, ingredient) => {
    if (err) console.log(err);
    console.log("Successful deletion");
    return res.status(200).send("success");
  });
};

export const updateIngredient = async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(req.body);
    const { name, image } = req.body;
    const ingredient2 = new Ingredient({ name, image });

    Ingredient.findByIdAndDelete(_id, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });

    await ingredient2.save();

    return res.status(200).send(ingredient2._id);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};

export const createMenuItem = async (req, res) => {
  try {
    console.log(req.body);
    const { name, description, ingredient, image, note } = req.body;
    const menuitem = new MenuItem({
      name,
      description,
      ingredient,
      image,
      note,
    });
    console.log(JSON.stringify(menuitem, null, 2));
    await menuitem.save();
    return res.status(200).send("success");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};

export const getAllMenuItems = async (req, res) => {
  MenuItem.find({}, (err, menuitem) => {
    let menuitemMap = [];

    menuitem.forEach((menuitem) => {
      menuitemMap.push(menuitem);
    });
    res.send(menuitemMap);
  });
};

export const deleteMenuItem = async (req, res) => {
  const id = req.params.id;

  MenuItem.findByIdAndDelete(id, (err, menuitem) => {
    if (err) console.log(err);
    console.log("Successful deletion");
    return res.status(200).send("success");
  });
};

export const updateMenuItem = async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(req.body);
    const { name, description, ingredient, image, note } = req.body;
    const menuitem2 = new MenuItem({
      name,
      description,
      ingredient,
      image,
      note,
    });

    MenuItem.findByIdAndDelete(_id, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });

    await menuitem2.save();

    return res.status(200).send(menuitem2._id);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};

export const createDiet = async (req, res) => {
  try {
    console.log(req.body);
    const { name, ingredient } = req.body;
    const diet = new Diet({
      name,
      ingredient,
    });
    await diet.save();
    return res.status(200).send("success");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};

export const getAllDiet = async (req, res) => {
  Diet.find({}, (err, diet) => {
    let dietMap = [];

    diet.forEach((diet) => {
      dietMap.push(diet);
    });
    res.send(dietMap);
  });
};

export const deleteDiet = async (req, res) => {
  const id = req.params.id;

  Diet.findByIdAndDelete(id, (err, diet) => {
    if (err) console.log(err);
    console.log("Successful deletion");
    return res.status(200).send("success");
  });
};

export const updateDiet = async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(req.body);
    const { name, ingredient } = req.body;
    const diet2 = new Diet({
      name,
      ingredient,
    });

    Diet.findByIdAndDelete(_id, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });

    await diet2.save();

    return res.status(200).send(diet2._id);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};

export const createCalendar = async (req, res) => {
  try {
    console.log(req.body);
    const { name, numDays, days } = req.body;
    const calendar = new Calendar({
      name,
      numDays,
      days,
    });
    await calendar.save();
    return res.status(200).send("success");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};

export const getAllCalendars = async (req, res) => {
  Calendar.find({}, (err, calendar) => {
    let calendarMap = [];

    calendar.forEach((calendar) => {
      calendarMap.push(calendar);
    });
    res.send(calendarMap);
  });
};

export const deleteCalendar = async (req, res) => {
  const id = req.params.id;

  Calendar.findByIdAndDelete(id, (err, calendar) => {
    if (err) console.log(err);
    console.log("Successful deletion");
    return res.status(200).send("success");
  });
};

export const updateCalendar = async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(req.body);
    const { name, numDays, days } = req.body;
    const calendar2 = new Calendar({
      name,
      numDays,
      days,
    });

    Calendar.findByIdAndDelete(_id, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });

    await calendar2.save();

    return res.status(200).send(calendar2._id);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};

export const createDay = async (req, res) => {
  try {
    // console.log(req.body);
    const { date, menu1, menu2, menu3 } = req.body;
    const day = new Day({
      date,
      menu1,
      menu2,
      menu3,
    });
    await day.save();
    return res.status(200).send("success");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};

export const getAllDays = async (req, res) => {
  Day.find({}, (err, day) => {
    let dayMap = [];

    day.forEach((day) => {
      dayMap.push(day);
    });
    res.send(dayMap);
  });
};

export const getOneDay = async (req, res) => {
  const id = req.params.id;

  if (mongoose.Types.ObjectId.isValid(id)) {
    Day.findById(id, (err, day) => {
      if (err) console.log(err);
      // console.log("day: ", day);
      res.send(day);
    });
  } else {
    return res.status(400).send("invalid address");
  }
};

export const deleteDay = async (req, res) => {
  const id = req.params.id;

  Day.findByIdAndDelete(id, (err, day) => {
    if (err) console.log(err);
    console.log("Successful deletion");
    return res.status(200).send("success");
  });
};

export const updateDay = async (req, res) => {
  try {
    const _id = req.params.id;
    // console.log(req.body);
    const { date, menu1, menu2, menu3 } = req.body;
    const day2 = new Day({
      date,
      menu1,
      menu2,
      menu3,
    });

    Day.findByIdAndDelete(_id, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });

    await day2.save();

    return res.status(200).send(day2._id);
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error. Try again");
  }
};

export const login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    //check if our db has user with that Email
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user found");
    //send user as json response
    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(400).send("Error. Try again");
  }
};
