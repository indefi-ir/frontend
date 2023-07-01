import React from 'react';
import { BuildingIcon } from '../../components/icons';

const CustomNode = (props: any) => {
  const { supplyChain } = props;

  return (
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
  );
}

const ViewChain = ({ chain }: any) => {
  return (
    <div className='flex w-full justify-between'>
      {chain?.map((supplyChain: any) => (
        <CustomNode supplyChain={supplyChain} />
      ))}
    </div>
  );
};
export default ViewChain

