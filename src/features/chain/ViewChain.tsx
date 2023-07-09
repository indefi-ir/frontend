import { Popover } from 'antd';
import useSWR from 'swr';
import React from 'react';
import { BuildingIcon } from '../../components/icons';
import { tooltipSupplyChainForCompanyUrl } from '../../services/apiEndpoint';
import { fetcher } from '../../services/axios';

const CustomNode = (props: any) => {
  const { supplyChain, chainId } = props;

  const { data: tooltipData } = useSWR(`${tooltipSupplyChainForCompanyUrl}?chainId=${chainId}&companyId=${supplyChain.company.id}`, fetcher);

  const tooltipContent = () => (
    <div className='flex flex-col'>
      <div>
        <span>خریدها</span>
        {tooltipData?.data?.buys?.map((buy: any) => (
          <>
            <div>
              <span className='block text-primary'>نام محصول</span>
              {buy?.product?.name}
            </div>
            <div>
              <span className='block text-primary'> میزان محصول</span>

              {buy?.productAmount}
            </div>
            <div>
              <span className='block text-primary'> مبلغ محصول</span>

              {buy?.value}
            </div>
          </>
        ))}
      </div>
      <div>
        <span className='block'>فروش ها</span>
        {tooltipData?.data?.sells?.map((sell: any) => (
          <>
            <div>
              <span className='block text-primary'> نام محصول</span>
              {sell?.product?.name}
            </div>
            <div>
              <span className='block text-primary'> میزان محصول‌</span>

              {sell?.productAmount}
            </div>
            <div>
              <span className='block text-primary'> مبلغ محصول</span>

              {sell?.value}
            </div>
          </>
        ))}
      </div>

    </div>
  );

  return (
    <Popover content={tooltipContent} trigger="hover">
      <div className='flex flex-col items-center justify-center'>
        <div className='flex justify-between items-center'>
          <div className='flex justify-center items-center rounded-full bg-primary-100 w-14 h-14 mb-2'>
            <BuildingIcon color="#5C59E8" width="30" height="30" />
          </div>
        </div>
        <div className='bg-blue-300 rounded-md py-2 px-5'>
          {supplyChain?.company?.name}
        </div>
        <div className='text-primary-500 font-bold'>{supplyChain?.order}</div>
      </div>
    </Popover>
  );
}

const ViewChain = ({ chain, chainId }: any) => {
  console.log("chain", chain)
  return (
    <div className='flex w-full justify-between'>
      {chain?.map((supplyChain: any) => (
        <CustomNode supplyChain={supplyChain} chainId={chainId} />
      ))}
    </div>
  );
};
export default ViewChain

