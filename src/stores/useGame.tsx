import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { EGameStates } from '../constants'
import type { GameStore } from '../types'

export default create(subscribeWithSelector<GameStore>((set) => ({
    blocksCount: 10,
    blocksSeed: 0,
    
    /**
     * Time
     */
    startTime: null,
    endTime: null,

    /**
     * Phases
     */
    phase: EGameStates.READY,

    start: () => {
        set((state) => {
            if(state.phase === EGameStates.READY)
                return { phase: EGameStates.PLAYING, startTime: Date.now() }

            return {}
        })
    },

    restart: () => {
        set((state) => {
            if(state.phase === EGameStates.PLAYING || state.phase === EGameStates.ENDED)
                return { phase: EGameStates.READY, blocksSeed: Math.random() }

            return {}
        })
    },

    end: () => {
        set((state) => {
            if(state.phase === EGameStates.PLAYING)
                return { phase: EGameStates.ENDED, endTime: Date.now() }

            return {}
        })
    }
})))
