import { Card } from "antd";
import { Image } from 'antd';

const ViewChain = () => {
  return (
    <Card>
      <div className="mb-10">
        <h1 className="text-3xl	mb-4">زنجیره تامین هلدینگ میدکو - صنعت فولاد</h1>
        <p>شرکت هلدینگ توسعه معادن و صنایع معدنی خاورمیانه بصورت صددرصد خصوصی و سهامی عام به منظور سرمایه گذاری و توسعه دربخش معادن و صنایع معدنی کشور، با مجوز سازمان بورس و اوراق بهادار کشور و پذیره نویسی عمومی و سرمایه 1000 میلیارد ریال، درآذرماه سال 1386 تأسیس و آغاز به کار نموده است. سرمایه میدکو با افزایش سرمایه در یازده مرحله به میزان 60،000 میلیارد ریال افزایش یافته است.</p>
      </div>
      <div className="mb-10">
        <span className="block mb-2">
          اسناد مربوط به زنجیره
        </span>
        <div className="flex justify-center items-center border-dashed border-2 border-gray-50 p-4 rounded-md">
          <Image
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
      </div>
      <div>
        <span className="block mb-2">
          زنجیره تامین
        </span>
        <div className="flex justify-center items-center border-dashed border-2 border-gray-50 p-4 rounded-md">

        </div>
      </div>
    </Card>
  )
}

ViewChain.layout = 'admin';
export default ViewChain;