export const NOT_FOUND = "NOT_FOUND";
export const BAD_REQUEST = "BAD_REQUEST";
export const INTERNAL_SERVER = "INTERNAL_SERVER";

export class RequestError extends Error {
  constructor(
    obj = {
      message: "",
      display: "",
      code: 200,
    }
  ) {
    super(obj.message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = obj.message;
    this.name = obj.display;
    this.display = obj.display;
    this.code = obj.code;
    Error.captureStackTrace(this);
  }
}

export const errorCodes = {
  NOT_FOUND: {
    message: "The data you have been trying to search does not exist",
    display: "Not Found",
    code: 404,
  },
  BAD_REQUEST: {
    message: "The request sent has invalid parameteres",
    display: "Bad Request",
    code: 400,
  },
  INTERNAL_SERVER: {
    message: "There has been an issue with the server",
    display: "Server Issue",
    code: 500,
  },
};
