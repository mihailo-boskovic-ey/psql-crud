import express from "express";
import * as controllerFn from "../controller/user.controller.js";

const Router = express.Router();

// // Fetching
Router.get("/all", controllerFn.getAllUsers);
Router.get("/all/extended", controllerFn.getAllUsersExtended);
Router.get("/single/:id", controllerFn.getSingleUser);
Router.get("/single/:id/extended", controllerFn.getSingleUserExtended);

// // Adding
Router.post("/add", controllerFn.addUser);
Router.post("/add-with-car", controllerFn.addUserWithCar);

// // Updating
Router.put("/update/:id", controllerFn.updateUser);
Router.put("/:id/add-car", controllerFn.addCarToUser);
Router.put("/:id/remove-car", controllerFn.removeCarFromUser);

// // Deleting
Router.delete("/delete/:id", controllerFn.deleteUser);
Router.delete("/delete-all", controllerFn.deleteAll);

export default Router;
