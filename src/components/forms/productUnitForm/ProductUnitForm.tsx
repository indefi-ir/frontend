import { Button, Checkbox, Form, Input, notification } from "antd";
import { useState } from "react";
import { mutate } from "swr";
import { addProductUnit, productUnitsUrl } from "../../../services/apiEndpoint";
import { post } from "../../../services/axios";
import toEnglishDigits from "../../../utils/toEnglishDigits";

const ProductUnitForm = ({closeModal}:any) => {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: any) => {
    setLoading(true);
    const finalData = {
      ...values,
      multiplier: toEnglishDigits(values.multiplier),
    }

    const result = await post(addProductUnit, finalData);
    if (result.status) {
      api["success"]({
        message: <span className='text-sm text-green-500'>واحد اندازه گیری مورد نظر با موفقیت افزوده شد.</span>,
        duration: 2,
      });
      await mutate(productUnitsUrl)
      closeModal();
    } else {
      api["error"]({
        message: <span className='text-sm text-red-500'>{result.response.data}</span>,
        duration: 2,
      });
    }
    setLoading(false);
  }

  return (
    <>
      {contextHolder}
      <div>
        <Form onFinish={onFinish} layout="vertical" autoComplete="false">
          <Form.Item className="flex-1" name="name" label="نام واحد" required>
            <Input />
          </Form.Item>
          <Form.Item className="flex-1" name="multiplier" label="مقدار به نسبت کمیت‌ اصلی" required>
            <Input type="number"/>
          </Form.Item>
          <Form.Item name="isDefault" valuePropName="checked" required>
            <Checkbox className='flex-1'>کمیت‌ اصلی</Checkbox>
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="primary" htmlType="submit" loading={loading} className="bg-pasargad-yellow-400 text-white hover:!text-white">
              ثبت
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  )
}
export default ProductUnitForm