const z = require("zod");

const signUpValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});
const signInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

module.exports = { signUpValidation, signInValidation };
