import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Button, FormInstance, message } from "antd";
import request from "service/fetch";

interface Props {
  time: number;
  form: FormInstance;
}

const CountDown: NextPage<Props> = (props) => {
  const { time, form } = props;
  const [count, setCount] = useState<number>(time);
  const [hasShowCode, setHasShowCode] = useState<boolean>(false);
  const timeRef = useRef<ReturnType<any>>(null);

  const handleGetCode = () => {
    if (form.getFieldValue("phone")) {
      request
        .post("/api/user/sendCode", {
          to: form.getFieldValue("phone"),
          templateId: 1
        })
        .then((response: any) => {
          if (response?.code === 200) {
            setHasShowCode(true);
          } else {
            message.error(response?.msg || "未知错误");
          }
        });
    } else {
      message.warning({
        content: "请输入手机号"
      });
    }
  };

  useEffect(() => {
    if (hasShowCode) {
      timeRef.current = setInterval(() => {
        setCount((num) => {
          if (num === 0) {
            setHasShowCode(false);
            return num;
          } else {
            return num - 1;
          }
        });
      }, 1000);
    }
    if (!hasShowCode) setCount(time);
    return () => {
      clearInterval(timeRef.current);
      timeRef.current = null;
    };
  }, [hasShowCode, time]);

  return (
    <>
      {hasShowCode ? (
        <Button type='link' disabled>
          {count}
        </Button>
      ) : (
        <Button key={2} type='link' onClick={handleGetCode}>
          获取验证码
        </Button>
      )}
    </>
  );
};

export default CountDown;
