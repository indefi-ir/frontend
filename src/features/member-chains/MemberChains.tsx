import useSWR, { mutate } from 'swr';
import { Collapse, CollapseProps } from "antd"
import { getAllSupplyChainsUrl } from "../../services/apiEndpoint";
import { fetcher } from "../../services/axios";
const { Panel } = Collapse
const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>gfgfg</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>dfdf</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>sdsd</p>,
  },
];

const MemberChains = ({ companyId }: any) => {
  const { data: supplyChains } = useSWR(getAllSupplyChainsUrl, fetcher)
  // const filtered = supplyChains.filter(supplyChain => {
  //   return supplyChain === companyId
  // })

  const filtered = supplyChains?.data.map((chain: any) => (
    chain?.chain.filter((item: any) => {
      return item.id === companyId
    })
  ))

  console.log(filtered)

  return (
    <Collapse defaultActiveKey={['1']} >
      {filtered.map(((chain:any, index:any) => {
        console.log("chain", chain)
        return (
          <Panel header="This is panel header 1" key={index}>
            <p>;skdl</p>
          </Panel>
        )
      }))}
    </Collapse>
  )
}

export default MemberChains