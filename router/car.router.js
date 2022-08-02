import express from "express";
import * as controllerFn from "../controller/car.controller.js";

const Router = express.Router();

// Fetching
Router.get("/all", controllerFn.allCars);
Router.get("/single/:id", controllerFn.singleCar);
Router.get("/owner/:id", controllerFn.getCarWithOwner);
Router.get("/get-by-brand/:brand", controllerFn.getCarByBrand);

// // Adding
Router.post("/add", controllerFn.addCar);

// // Updating
Router.put("/update/:id", controllerFn.updateCar);

// // Deleting
Router.delete("/delete/:id", controllerFn.deleteCar);
Router.delete("/delete-by-brand", controllerFn.deleteByBrand);
Router.delete("/delete-all", controllerFn.deleteAll);

export default Router;
