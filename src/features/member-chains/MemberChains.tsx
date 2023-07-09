import useSWR, { mutate } from 'swr';
import { Collapse } from "antd"
import { supplyChainForCompanyUrl } from "../../services/apiEndpoint";
import { fetcher } from "../../services/axios";
import ViewChain from '../chain/ViewChain';
const { Panel } = Collapse
const MemberChains = ({ companyId }: any) => {
  const supplyChainsUrl = `${supplyChainForCompanyUrl}${companyId}`;
  const { data: supplyChains, error: companyTotalCreditsError } = useSWR(supplyChainsUrl, fetcher);


  console.log("supplyChains?.data", supplyChains)

  return (
    <Collapse defaultActiveKey={['0']} className="mb-4" >
      {supplyChains?.data?.map(((chain:any, index:any) => {
        return (
          <Panel header={chain.name} key={index}>
            <ViewChain chain={chain.chain}/>
          </Panel>
        )
      }))}
    </Collapse>
  )
}

export default MemberChains