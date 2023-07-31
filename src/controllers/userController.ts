import {
  getUserByIdService,
  getUserService,
  editUserService,
  editLoggedInUserService,
  userLoginService,
  userRegisterService,
} from "$services/userServices";
import {
  response_internal_server_error,
  response_success,
  response_unauthorized,
} from "$utils/response.utils";
import { UserEdit, UserRegister } from "$utils/user.utils";
import { Request, Response } from "express";

export async function login(req: Request, res: Response): Promise<Response> {
  try {
    const { username, password,  } = req.body;
    const { status, data, error } = await userLoginService(username, password);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function register(req: Request, res: Response) {
  try {
    const userData:UserRegister = req.body
  
    const { status, data, error } = await userRegisterService(userData);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function editUser(req: Request, res: Response) {
  try {
    const userId = req.params.id;
    const userData:UserEdit = req.body
  
    const { status, data, error } = await editUserService(userData, userId);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function editLoggedInUser(req: Request, res: Response) {
  try {
    const userId = res.locals.jwtPayload.id;
    const userData:UserEdit = req.body
  
    const { status, data, error } = await editLoggedInUserService(userData, userId);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const { status, data, error } = await getUserService();
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const id = req.params.id;

    const { status, data, error } = await getUserByIdService(id);
    if (status) {
      return response_success(res, data);
    } else {
      return response_unauthorized(res, error);
    }

  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}