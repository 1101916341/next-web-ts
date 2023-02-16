import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";

interface Props {
  time: number;
}

const CountDown: NextPage<Props> = (props) => {
  const { time } = props;
  const [count, setCount] = useState<number>(time);
  const [hasShowCode, setHasShowCode] = useState<boolean>(false);
  const timeRef = useRef<ReturnType<any>>(null);

  const handleGetCode = () => {
    setHasShowCode(true);
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
