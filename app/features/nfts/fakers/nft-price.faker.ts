import { faker } from '@faker-js/faker';

export const getNftPrice = (): number => {
  return faker.number.float({
    min: 0.1,
    max: 5,
  });
};