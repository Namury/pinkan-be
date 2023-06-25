import { prisma } from "$utils/prisma.utils";
import { UserRegister, UserResponse, UserToken } from "$utils/user.utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { response } from "$utils/response.utils";

function createToken(user: UserToken) {
  const token = jwt.sign(
    { id: user.id, shNumber: user.shNumber },
    process.env.JWT_SECRET_TOKEN?.toString() || "",
    {
      expiresIn: "24h",
    }
  );
  return token;
}

export async function userLoginService(
  username: string,
  password: string
): Promise<response> {
  try {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let condition: object;

    condition = { shNumber: username };
    if (re.test(username)) {
      condition = { email: username };
    }

    console.log(condition)
    const user = await prisma.user.findUnique({
      where: condition,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken(user);
      const userDetails: UserResponse = {
        token: token,
        name: user.name,
        shNumber: user.shNumber? user.shNumber :"",
      };

      if(user.email){
        userDetails.isAdmin = true;
      }

      return {
        status: true,
        message: "Login Success",
        data: userDetails,
      };
    } else {
      throw new Error("Incorrect");
    }
  } catch (err: unknown) {
    return {
      status: false,
      message: "Login Failed",
      data: {},
      error: String(err),
    };
  }
}

export async function userRegisterService(
  user: UserRegister
): Promise<response> {
  try {
    const selectedUserField = {
      id: true,
      shNumber: true,
      name: true,
    };
    user.password = await bcrypt.hash(user.password, 12);

    const createdUser = await prisma.user.create({
      data: {
        ...user,
      },
      select: selectedUserField,
    });
    const token = createToken(createdUser);

    return {
      status: true,
      data: { user: createdUser, token },
      message: "Register Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Register Failed",
      error: String(err),
    };
  }
}
