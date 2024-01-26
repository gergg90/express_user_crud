const zod = require("zod");

const geolocationSchema = zod.object({
  lat: zod.string().default(""),
  long: zod.string().default(""),
});

const addressSchema = zod.object({
  geolocation: geolocationSchema,
  city: zod.string().default(""),
  street: zod.string().default(""),
  number: zod.number().int().positive().default(0),
  zipcode: zod.string().default(""),
});

const nameSchema = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
});

const userSchema = zod.object({
  address: addressSchema,
  id: zod.number().int().positive(),
  email: zod.string().email(),
  username: zod.string(),
  password: zod.string(),
  name: nameSchema,
  phone: zod.string().default(""),
  __v: zod.number().int().positive().default(0),
});

const validateUser = (object) => {
  return userSchema.safeParse(object);
};

module.exports = {
  validateUser,
};

// zod
//     .string()
//     .min(8)
//     .regex(/[a-zA-Z0-9]/)
//     .message(
//       "La contraseña debe tener al menos 8 caracteres y contener letras y números."
//     ),
