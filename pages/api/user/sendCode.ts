import { NextApiRequest, NextApiResponse } from "next";
import md5 from "md5";
import { format } from "date-fns";
import { encode } from "js-base64";

export default async function senCode(req: NextApiRequest, res: NextApiResponse) {
  const { to = "", templateId = "1" } = req.body;
  console.log(req.body, "req.body");
  res.status(200).json({
    status: 200,
    data: 233445
  });
}
