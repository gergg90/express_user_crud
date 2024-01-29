const zod = require("zod");

const geolocationSchema = zod.object({
  lat: zod.string(),
  long: zod.string(),
});

const addressSchema = zod.object({
  geolocation: geolocationSchema.default({ lat: "", long: "" }),
  city: zod.string().default(""),
  street: zod.string().default(""),
  number: zod.number().int().min(0).max(99999999).default(0),
  zipcode: zod.string().default(""),
});

const nameSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
});

const passwordSchema = zod
  .string()
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
  .min(8)
  .refine((value) => {
    if (!/(?=.*[a-z])/.test(value)) {
      throw new Error(
        'The "password" field must contain at least one lowercase letter'
      );
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      throw new Error(
        'The "password" field must contain at least one capital letter'
      );
    }
    if (!/(?=.*\d)/.test(value)) {
      throw new Error('The "password" field must contain at least one number');
    }

    return true;
  });

const userSchema = zod.object({
  address: addressSchema.optional().default({ city: "" }),
  id: zod.number().int().positive(),
  email: zod.string().email(),
  username: zod.string(),
  password: passwordSchema,
  name: nameSchema,
  phone: zod.string().default(""),
  __v: zod.number().int().positive().optional(),
});

const validateUser = (object) => {
  return userSchema.safeParse(object);
};

const partialValidateUser = (object) => {
  return userSchema.partial().safeParse(object);
};

module.exports = {
  validateUser,
  partialValidateUser,
};
