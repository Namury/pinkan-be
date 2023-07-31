import { prisma } from "$utils/prisma.utils";
import { UserRegister, UserEdit, UserResponse, UserToken } from "$utils/user.utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { response } from "$utils/response.utils";

function createToken(user: UserToken) {
  const token = jwt.sign(
    { id: user.id, shNumber: user.shNumber? user.shNumber: null, isAdmin: user.isAdmin },
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

    const user = await prisma.user.findUnique({
      where: condition,
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = createToken({...user, isAdmin: user.email ? true : false});
      const userDetails: UserResponse = {
        token: token,
        name: user.name,
        shNumber: user.shNumber? user.shNumber :"",
      };

      if(user.email){
        userDetails.isAdmin = true;
      } else {
        userDetails.isAdmin = false;
      }

      return {
        status: true,
        message: "Login Success",
        data: userDetails,
      };
    } else {
      throw new Error("Username/Password Salah");
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
      email: true,
      name: true,
    };
    user.password = await bcrypt.hash(user.password, 12);

    const createdUser = await prisma.user.create({
      data: {
        ...user,
      },
      select: selectedUserField,
    });
    const token = createToken({...createdUser, isAdmin: createdUser.email ? true : false});

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

export async function editUserService(
  user: UserEdit,
  userId: string
): Promise<response> {
  try {
    const selectedUserField = {
      id: true,
      shNumber: true,
      salesZoneId: true,
      email: true,
      name: true,
    };

    console.log("password", user.password);
    console.log("id", userId);
    if(user.password){
      user.password = await bcrypt.hash(user.password, 12);
    }

    const editedUser = await prisma.user.update({
      where:{
        id: userId
      },
      data: {
        ...user,
      },
      select: selectedUserField,
    });
    const token = createToken({...editedUser, isAdmin: editedUser.email ? true : false});

    return {
      status: true,
      data: { user: editedUser, token },
      message: "Edit User Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Edit User Failed",
      error: String(err),
    };
  }
}

export async function editLoggedInUserService(
  user: UserEdit,
  userId: string
): Promise<response> {
  try {
    const selectedUserField = {
      id: true,
      shNumber: true,
      salesZoneId: true,
      email: true,
      name: true,
    };

    console.log("password", user.password);
    console.log("id", userId);
    if(user.password){
      user.password = await bcrypt.hash(user.password, 12);
    }

    const editedUser = await prisma.user.update({
      where:{
        id: userId
      },
      data: {
        ...user,
      },
      select: selectedUserField,
    });
    const token = createToken({...editedUser, isAdmin: editedUser.email ? true : false});

    return {
      status: true,
      data: { user: editedUser, token },
      message: "Edit User Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Edit User Failed",
      error: String(err),
    };
  }
}

export async function getUserService(): Promise<response> {
  try {
    const selectedUserField = {
      id: true,
      shNumber: true,
      name: true,
    };

    const user = await prisma.user.findMany({
      where: {
        email: null
      }, select: selectedUserField
    });

    return {
      status: true,
      data: user,
      message: "Get User Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get User Failed",
      error: String(err),
    };
  }
}

export async function getUserByIdService(
  id: string
): Promise<response> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      }
    });

    return {
      status: true,
      data: { ...user },
      message: "Get User by ID Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get User by ID Failed",
      error: String(err),
    };
  }
}