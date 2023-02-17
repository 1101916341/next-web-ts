import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import md5 from "md5";
import { format } from "date-fns";
import { encode } from "js-base64";
import request from "service/fetch";
import { ironOptions } from "config/index";
import { ISession } from "pages/api/index";

export default withIronSessionApiRoute(senCode, ironOptions);

async function senCode(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { to = "", templateId = "1" } = req.body;
  const AppId = "2c94811c865849b801865adb0d1a0102";
  const AccountId = "2c94811c865849b801865adb0bf900fb";
  const AuthToken = "324acf09020f4e9d9c2cc32f33a8e4be";
  const nowDate = format(new Date(), "yyyyMMddHHmmss");
  const SigParameter = md5(`${AccountId}${AuthToken}${nowDate}`);
  const Authorization = encode(`${AccountId}:${nowDate}`);
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  const expireMinute = "1";
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;

  const response = await request.post(
    url,
    {
      to,
      templateId,
      appId: AppId,
      data: { verifyCode, expireMinute }
    },
    {
      headers: {
        Authorization
      }
    }
  );
  const { statusCode, templateSMS, statusMsg } = response as any;
  if (statusCode === "000000") {
    session.verifyCode = verifyCode;
    await session.save();
    res.status(200).json({
      code: 200,
      msg: statusMsg,
      data: {
        templateSMS
      }
    });
  } else {
    res.status(200).json({
      code: statusCode,
      msg: statusMsg
    });
  }
}
