import { response_bad_request } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";

function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function validateLoginRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body;

  if (!username) return response_bad_request(res, "Username/Email is required");
  if (!password) return response_bad_request(res, "Password is required");
  next();
}

export function validateRegisterRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password, name } = req.body;

  if (!email) return response_bad_request(res, "Email is required");
  if (!validateEmail(email))
    return response_bad_request(res, "Email provided is not a correct form");
  if (!password) return response_bad_request(res, "Password is required");
  if (!name) return response_bad_request(res, "Name is required");
  next();
}