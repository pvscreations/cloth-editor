
import { Perf } from 'r3f-perf'
import { JSX } from 'react'
import { ExperienceProps } from './types'
import { Index } from './stages/Index'
export default function Experience({}: ExperienceProps): JSX.Element {
  

    return <>
        <color args={ [ '#bdedfc' ] } attach="background" />
        <Perf position='top-left'/>
        <Index />
    </>
}
