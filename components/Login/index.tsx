import type { NextPage } from "next";
import React from "react";
import { Form, Input, Modal, Button } from "antd";

interface Props {
  isOpen: boolean;
  onClose: Function;
}
// const { Option } = Select;
const Login: NextPage<Props> = (props) => {
  const { isOpen, onClose } = props;

  const handleFinish = (value: any) => {
    console.log("登录", value);
  };
  return (
    <Modal
      destroyOnClose={true}
      open={isOpen}
      className='login'
      title='手机号登录'
      width={340}
      centered
      onCancel={() => onClose()}
      maskClosable={false}
      footer={null}>
      <Form onFinish={handleFinish}>
        <Form.Item name='phone'>
          <Input placeholder='请输入手机号' />
        </Form.Item>
        <div className='get-code'>
          <Form.Item name='code'>
            <Input placeholder='请输入验证码' />
          </Form.Item>
          <Button type='link'>获取验证码</Button>
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