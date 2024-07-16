import formidable, { Formidable } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data: {
      err: any;
      fields: formidable.Fields<string>;
      files: formidable.Files<string>;
    } = await new Promise((resolve, reject) => {
      const form = new Formidable();

      form.parse(req, (err, fields, files) => {
        if (err) reject({ err });
        resolve({ err, fields, files });
      });
    });

    if (data.err) {
      res.status(400).json({
        message: String(data.err),
      });

      return;
    }

    const { username, password } = data.fields;

    if (
      !username ||
      (username && !username[0]) ||
      !password ||
      (password && !password[0])
    ) {
      res.status(400).json({
        message: "Username and password is required",
      });
      return;
    }

    const token = jwt.sign(
      {
        username: "Hey",
        name: "Ho",
      },
      "supersecret",
      {
        expiresIn: "60s",
      }
    );

    res
      .setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly; Max-Age=60`)
      .status(200)
      .json({
        message: "OK",
        data: {
          token,
        },
      });

    return;
  }

  res.status(400).json({
    message: "Resource not found",
  });
};

export default handler;
