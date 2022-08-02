import {
  errorCodes,
  RequestError,
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER,
} from "../helper/error.js";
import { checkIsFieldValid, client, generateID } from "../helper/helper.js";

// Get all the cars
export const allCars = async (req, res) => {
  try {
    const cars = await client.pratice_cars.findMany();

    if (cars.length === 0) throw new RequestError(errorCodes[NOT_FOUND]);

    res.status(200).json({
      success: true,
      status: 200,
      data: cars,
    });
  } catch (error) {
    console.log(error.message);
    res.status(error.code).json({
      message: error.message,
      status: error.code,
      display: error.display,
    });
  }
};

// Get single car based on param
export const singleCar = async (req, res) => {
  const { id } = req.params;
  try {
    const car = await client.pratice_cars.findUnique({
      where: { id },
      select: {
        make: true,
        model: true,
      },
    });

    if (car === null) throw new RequestError(errorCodes[NOT_FOUND]);
    res.status(200).json({
      success: true,
      status: 200,
      data: car,
    });
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
      status: error.code,
      display: error.display,
    });
  }
};

// Get single car along with the owner
export const getCarWithOwner = async (req, res) => {
  const { id } = req.params;
  try {
    const carWithOwner = await client.pratice_cars
      .findUnique({
        where: { id },
        select: {
          make: true,
          model: true,
          driver: {
            select: { firstname: true, lastname: true },
          },
        },
      })
      .catch((error) => {
        console.log(error);
        throw new RequestError(errorCodes[INTERNAL_SERVER]);
      });

    if (carWithOwner === null) throw new RequestError(errorCodes[NOT_FOUND]);
    res.status(200).json({
      success: true,
      status: 200,
      data: carWithOwner,
    });
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
      status: error.code,
      display: error.display,
    });
  }
};

// Get car by brand
export const getCarByBrand = async (req, res) => {
  const { brand } = req.params;
  try {
    const manyCars = await client.pratice_cars
      .findMany({
        where: { make: brand },
        select: {
          make: true,
          model: true,
        },
      })
      .catch((error) => {
        console.log(error);
        throw new RequestError(errorCodes[INTERNAL_SERVER]);
      });

    if (manyCars.length === 0) throw new RequestError(errorCodes[NOT_FOUND]);
    res.status(200).json({
      success: true,
      status: 200,
      data: manyCars,
    });
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
      status: error.code,
      display: error.display,
    });
  }
};

// Add Car
export const addCar = async (req, res) => {
  const { make, model, driver_id } = req.body;
  try {
    const car = {
      id: generateID(),
      make,
      model,
      driver_id: driver_id,
    };

    const returnValue = await client.pratice_cars
      .create({
        data: car,
      })
      .catch((err) => {
        throw new RequestError({
          message: err.message,
          display: "Bad Info",
          code: 500,
        });
      });

    res.status(200).json({
      success: true,
      status: 200,
      data: returnValue,
    });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({
      message: error.message,
      status: error.code,
      display: error.display,
    });
  }
};

export const updateCar = async (req, res) => {
  const { id } = req.params;
  const { field, value } = req.body;
  try {
    if (!checkIsFieldValid(field))
      throw new RequestError(errorCodes[BAD_REQUEST]);
    if (value.length < 2) throw new RequestError(errorCodes[BAD_REQUEST]);

    const returnValue = await client.pratice_cars
      .update({
        where: {
          id,
        },
        data: {
          [field]: value,
        },
      })
      .catch((err) => {
        throw new RequestError({
          message: err.message,
          display: "Bad Info",
          code: 500,
        });
      });

    res.status(200).json({
      success: true,
      status: 200,
      data: returnValue,
    });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({
      message: error.message,
      status: error.code,
      display: error.display,
    });
  }
};

export const deleteCar = async (req, res) => {
  const { id } = req.params;
  try {
    await client.pratice_cars
      .delete({
        where: {
          id,
        },
      })
      .catch((err) => {
        throw new RequestError({
          message: err.message,
          display: "Bad Info",
          code: 500,
        });
      });

    res.status(200).json({
      success: true,
      status: 200,
      data: "successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({
      message: error.message,
      status: error.code,
      display: error.display,
    });
  }
};

export const deleteByBrand = async (req, res) => {
  const { brand } = req.body;
  try {
    await client.pratice_cars
      .deleteMany({
        where: {
          make: brand,
        },
      })
      .catch((err) => {
        throw new RequestError({
          message: err.message,
          display: "Bad Info",
          code: 500,
        });
      });

    res.status(200).json({
      success: true,
      status: 200,
      data: "successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({
      message: error.message,
      status: error.code,
      display: error.display,
    });
  }
};

export const deleteAll = async (req, res) => {
  try {
    await client.pratice_cars.deleteMany().catch((err) => {
      throw new RequestError({
        message: err.message,
        display: "Server Error",
        code: 500,
      });
    });

    res.status(200).json({
      success: true,
      status: 200,
      data: "successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({
      message: error.message,
      status: error.code,
      display: error.display,
    });
  }
};
