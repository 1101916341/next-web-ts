import type { NextPage } from "next";
import React from "react";
import { Form, Input, Modal, Button, message } from "antd";
import CountDown from "components/CountDown";
import request from "service/fetch";

interface Props {
  isOpen: boolean;
  onClose: Function;
}
const Login: NextPage<Props> = (props) => {
  const [form] = Form.useForm();
  const { isOpen, onClose } = props;

  const handleFinish = (value: any) => {
    if (!value.phone) {
      message.warning("手机号不能为空");
    } else if (!value.verifyCode) {
      message.warning("验证码不能为空");
    } else {
      if (value.verifyCode === "") {
        request.post("/api/user/login", value).then((res: any) => {
          if (res?.code === 200) {
            onClose && onClose();
          } else {
            message.error(res?.msg || "未知错误");
          }
        });
        console.log(value);
      } else {
        message.warning("验证码不正确，请重新输入");
      }
    }
  };

  const handleCloseModal = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      destroyOnClose={true}
      open={isOpen}
      className='login'
      title='手机号登录'
      width={340}
      centered
      onCancel={handleCloseModal}
      maskClosable={false}
      footer={null}>
      <Form onFinish={handleFinish} form={form}>
        <Form.Item name='phone'>
          <Input placeholder='请输入手机号' />
        </Form.Item>
        <div className='get-code'>
          <Form.Item name='verifyCode'>
            <Input placeholder='请输入验证码' />
          </Form.Item>
          <CountDown time={10} form={form} />
        </div>
        <Button type='primary' htmlType='submit' block>
          登录
        </Button>
        <div className='btn-text'>
          <Button type='link'>使用Github登录</Button>
          <span className='login-text'>
            注册登录即表示同意 <Button type='link'>隐私政策</Button>
          </span>
        </div>
      </Form>
    </Modal>
  );
};

export default Login;
