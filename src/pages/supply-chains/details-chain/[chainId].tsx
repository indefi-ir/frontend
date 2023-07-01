import useSWR from 'swr';
import { Card } from "antd";
import { useRouter } from "next/router";
import { fetcher } from '../../../services/axios';
import { supplyChainDetailsUrl } from '../../../services/apiEndpoint';
import { ViewChain } from '../../../features';

const DetailsChain = () => {
  const router = useRouter();
  const { chainId } = router.query;

  const supplyChainDetails = `${supplyChainDetailsUrl}${chainId}`;
  const { data: chainDetails, error: companyDetailsError } = useSWR(supplyChainDetails, fetcher);

  return (
    <Card>
      <div className="mb-10">
        <h1 className="text-3xl	mb-4">{chainDetails?.data?.name}</h1>
        <p>{chainDetails?.data?.description}</p>
      </div>
      <div className="mb-10">
        <span className="block mb-2">
          اسناد مربوط به زنجیره
        </span>
        {/* <div className="flex justify-center items-center border-dashed border-2 border-gray-50 p-4 rounded-md">
          <Image
            width={200}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div> */}
      </div>
      <div>
        <span className="block mb-2">
          زنجیره تامین
        </span>
        <div className="flex justify-center items-center border-dashed border-2 border-gray-50 p-10 rounded-md">
          <ViewChain chain={chainDetails?.data?.chain} />
        </div>
      </div>
    </Card>
  )
}

DetailsChain.layout = 'admin';
export default DetailsChain;