import { InputType, Field } from "type-graphql";

@InputType()
class RegisterInput {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
}

export const validateRegister = (options: RegisterInput) => {
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "Username length must be greater than 2",
      },
    ];
  }
  if (options.username.includes("@")) {
    return [
      {
        field: "username",
        message: "Username cannot contain @",
      },
    ];
  }
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Email cannot contain @",
      },
    ];
  }
  if (options.password.length <= 4) {
    return [
      {
        field: "password",
        message: "Password length must be greater than 4",
      },
    ];
  }

  return null;
};
