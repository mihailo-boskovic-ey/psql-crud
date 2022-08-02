import {
  errorCodes,
  RequestError,
  NOT_FOUND,
  BAD_REQUEST,
  INTERNAL_SERVER,
} from "../helper/error.js";
import { checkIsFieldValid, client, generateID } from "../helper/helper.js";

export const getAllUsers = async (req, res) => {
  try {
    const responseData = await client.pratice_users.findMany().catch((err) => {
      console.log(error);
      throw new RequestError(errorCodes[INTERNAL_SERVER]);
    });
    if (responseData.length === 0) {
      throw new RequestError(errorCodes[NOT_FOUND]);
    }
    res.status(200).json({
      success: true,
      status: 200,
      data: responseData,
    });
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
      status: error.code,
      display: error.display,
    });
  }
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  try {
    const responseData = await client.pratice_users
      .findFirst({
        where: { id },
      })
      .catch((err) => {
        console.log(err);
        throw new RequestError(errorCodes[BAD_REQUEST]);
      });
    if (responseData === null) {
      throw new RequestError(errorCodes[NOT_FOUND]);
    }
    res.status(200).json({
      success: true,
      status: 200,
      data: responseData,
    });
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
      status: error.code,
      display: error.display,
    });
  }
};

export const getAllUsersExtended = async (req, res) => {
  try {
    const responseData = await client.pratice_users
      .findMany({
        include: { cars: { select: { make: true, model: true } } },
      })
      .catch((err) => {
        console.log(err);
        throw new RequestError(errorCodes[BAD_REQUEST]);
      });

    if (responseData.length === 0)
      throw new RequestError(errorCodes[NOT_FOUND]);
    res.status(200).json({
      success: true,
      status: 200,
      data: responseData,
    });
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
      status: error.code,
      display: error.display,
    });
  }
};

export const getSingleUserExtended = async (req, res) => {
  const { id } = req.params;

  try {
    const responseData = await client.pratice_users
      .findFirst({
        include: { cars: { select: { make: true, model: true } } },
        where: {
          id,
        },
      })
      .catch((err) => {
        console.log(err);
        throw new RequestError(errorCodes[BAD_REQUEST]);
      });

    if (responseData === null) throw new RequestError(errorCodes[NOT_FOUND]);
    res.status(200).json({
      success: true,
      status: 200,
      data: responseData,
    });
  } catch (error) {
    res.status(error.code).json({
      message: error.message,
      status: error.code,
      display: error.display,
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const { firstname, lastname } = req.body;
    if (!firstname || firstname === "")
      throw new RequestError(errorCodes[BAD_REQUEST]);
    if (!lastname || lastname === "")
      throw new RequestError(errorCodes[BAD_REQUEST]);

    const user = {
      id: generateID(),
      firstname,
      lastname,
      //   cars: [],
    };
    const responseData = await client.pratice_users
      .create({
        data: user,
      })
      .catch((err) => {
        console.log(err.message);
        throw new RequestError(errorCodes[errorCodes]);
      });

    res.status(200).json({
      success: true,
      status: 200,
      data: responseData,
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

export const addUserWithCar = async (req, res) => {
  try {
    const { firstname, lastname, make, model } = req.body;

    const responseData = await client.pratice_users
      .create({
        data: {
          id: generateID(),
          firstname,
          lastname,
          cars: { create: { id: generateID(), make, model } },
        },
      })
      .catch((err) => {
        console.log(err.message);
        throw new RequestError(errorCodes[errorCodes]);
      });

    res.status(200).json({
      success: true,
      status: 200,
      data: responseData,
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

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { field, value } = req.body;
  try {
    if (!checkIsFieldValid(field))
      throw new RequestError(errorCodes[BAD_REQUEST]);
    if (value.length < 2) throw new RequestError(errorCodes[BAD_REQUEST]);

    const responseData = await client.pratice_users
      .update({
        data: {
          [field]: value,
        },
        where: {
          id,
        },
        include: {
          cars: true,
        },
      })
      .catch((err) => {
        console.log(err.message);
        throw new RequestError(errorCodes[BAD_REQUEST]);
      });

    res.status(200).json({
      success: true,
      status: 200,
      data: responseData,
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

export const deleteAll = async (req, res) => {
  try {
    await client.pratice_users.deleteMany().catch((err) => {
      console.log(err);
      throw new RequestError(errorCodes[INTERNAL_SERVER]);
    });
    res.status(200).json({
      success: true,
      status: 200,
      data: "successfully deleted",
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

export const addCarToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { car_id = null, make = null, model = null } = req.body;

    const responseData = await client.pratice_users
      .update({
        where: {
          id,
        },
        include: {
          cars: true,
        },
        data: {
          cars: {
            connectOrCreate: {
              where: { id: car_id },
              create: {
                id: generateID(),
                make,
                model,
              },
            },
          },
        },
      })
      .catch((err) => {
        console.log(err.message);
        throw new RequestError(errorCodes[BAD_REQUEST]);
      });

    res.status(200).json({
      success: true,
      status: 200,
      data: responseData,
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

export const removeCarFromUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { car_id = null } = req.body;

    if (car_id === null) throw new RequestError(errorCodes[BAD_REQUEST]);
    const responseData = await client.pratice_users.update({
      where: {
        id,
      },
      data: {
        cars: {
          disconnect: { id: car_id },
        },
      },
      include: {
        cars: true,
      },
    });
    res.status(200).json({
      success: true,
      status: 200,
      data: responseData,
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

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await client.pratice_users
      .delete({
        where: {
          id,
        },
      })
      .catch((err) => {
        console.log(err.message);
        throw new RequestError(errorCodes[BAD_REQUEST]);
      });
    res.status(200).json({
      success: true,
      status: 200,
      data: "User successfully deleted",
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
