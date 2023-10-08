import { ForceGraph2D, ForceGraph3D, ForceGraphVR, ForceGraphAR } from 'react-force-graph';
import SpriteText from 'three-spritetext';

const GraphChain= ()=>(
    fetch('./miserables.json').then(res => res.json()).then(data => {
      <ForceGraph3D
          graphData={data}
          nodeAutoColorBy="group"
          nodeThreeObject={(node: { id: any; color: any; }) => {
            const sprite = new SpriteText(node.id);
            sprite.color = node.color;
            sprite.textHeight = 8;
            return sprite;
          }}
        />
    })
  )

export default GraphChain