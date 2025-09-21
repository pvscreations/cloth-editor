import { useMemo, type FC } from 'react'
import { BlockStart } from './levels/BlockStart'
import { BlockEnd } from './levels/BlockEnd'
import { BlockSpinner } from './levels/BlockSpinner'
import { BlockLimbo } from './levels/BlockLimbo'
import { BlockAxe } from './levels/BlockAxe'
import { Bounds } from './levels/Bounds'
import type { LevelProps, BlockProps } from './types'

interface CustomLevelProps extends LevelProps {
    types?: Array<FC<BlockProps>>;
    seed?: number;
}

export const Level: FC<CustomLevelProps> = ({
    count = 5,
    types = [ BlockSpinner, BlockAxe, BlockLimbo ],
    seed = 0
}) => {
    const blocks = useMemo(() => {
        const blocks: Array<FC<BlockProps>> = []

        for(let i = 0; i < count; i++) {
            const type = types[ Math.floor(Math.random() * types.length) ]
            blocks.push(type)
        }

        return blocks
    }, [ count, types, seed ])
    
    return <>
        <BlockStart position={ [ 0, 0, 0 ] } />

        { blocks.map((Block, index) => <Block key={ index } position={ [ 0, 0, - (index + 1) * 4 ] } />) }
        
        <BlockEnd position={ [ 0, 0, - (count + 1) * 4 ] } />

        <Bounds length={ count + 2 } />
    </>
}
