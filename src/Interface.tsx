import { useKeyboardControls } from '@react-three/drei'
import useGame from './stores/useGame'
import { useEffect, useRef, type FC } from 'react'
import { addEffect } from '@react-three/fiber'
import type { InterfaceProps } from './types'
import { useGameStage } from './stores/useGameStage'
import { EGameStage } from './constants'

const Interface: FC<InterfaceProps> = () => {
    const stage=useGameStage((state)=>state.stage)
    const time = useRef<HTMLDivElement>(null)

    const restart = useGame((state) => state.restart)
    const phase = useGame((state) => state.phase)
    const forward = useKeyboardControls((state) => state.forward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const rightward = useKeyboardControls((state) => state.rightward)
    const jump = useKeyboardControls((state) => state.jump)

    useEffect(() => {
        const unsubscribeEffect = addEffect(() => {
            if (stage == EGameStage.GAME_PLAY) {
                
            
                const state = useGame.getState()

                let elapsedTime = 0

                if (state.phase === 'playing' && state.startTime)
                    elapsedTime = Date.now() - state.startTime
                else if (state.phase === 'ended' && state.startTime && state.endTime)
                    elapsedTime = state.endTime - state.startTime

                elapsedTime /= 1000
                const formattedTime = elapsedTime.toFixed(2)

                if (time.current)
                    time.current.textContent = formattedTime
            }
})

        return () => {
            unsubscribeEffect()
        }
    }, [stage])

    if (stage != EGameStage.GAME_PLAY) return null

    return <div className="interface">
        {/* Time */}
        <div ref={ time } className="time">0.00</div>

        {/* Restart */}
        { phase === 'ended' && <div className="restart" onClick={ restart }>Restart</div> }

        {/* Controls */}
        <div className="controls">
            <div className="raw">
                <div className={ `key ${ forward ? 'active' : '' }` }></div>
            </div>
            <div className="raw">
                <div className={ `key ${ leftward ? 'active' : '' }` }></div>
                <div className={ `key ${ backward ? 'active' : '' }` }></div>
                <div className={ `key ${ rightward ? 'active' : '' }` }></div>
            </div>
            <div className="raw">
                <div className={ `key large ${ jump ? 'active' : '' }` }></div>
            </div>
        </div>
    </div>
}

export default Interface;
