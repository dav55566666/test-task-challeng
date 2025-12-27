import { faker } from "@faker-js/faker";

export const getTimeoutDate = (): Date => {
  return faker.date.soon({ days: 1 });
};