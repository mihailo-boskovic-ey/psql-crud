import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export const refactorData = (data) => {
  return JSON.stringify(data, (_, v) =>
    typeof v === "bigint" ? `${v}n` : v
  ).replace(/"(-?\d+)n"/g, (_, a) => a);
};

export const generateID = () => uuidv4();

export const client = new PrismaClient();

export const checkIsFieldValid = (field) => {
  switch (field) {
    case "firstname":
      return true;
    case "lastname":
      return true;
    case "make":
      return true;
    case "model":
      return true;
    default:
      return false;
  }
};
