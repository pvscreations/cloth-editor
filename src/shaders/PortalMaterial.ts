import * as THREE from 'three'
import { extend } from '@react-three/fiber'
//@ts-ignore
import portalVertexShader from './portal/vertex.glsl'
//@ts-ignore
import portalFragmentShader from './portal/fragment.glsl'
import { JSX } from 'react/jsx-dev-runtime'
export default class PortalMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color('hotpink') },
        uColorEnd: { value: new THREE.Color('white') },
      },
      vertexShader: portalVertexShader,
      fragmentShader: portalFragmentShader,
    })
  }

  get time() {
    return this.uniforms.uTime.value
  }

  set time(v) {
    this.uniforms.uTime.value = v
  }

  get colorStart() {
    return this.uniforms.uColorStart.value
  }

  get colorEnd() {
    return this.uniforms.uColorEnd.value
  }
}

extend({ PortalMaterial })
declare module "@react-three/fiber" {
  interface ThreeElements {
    portalMaterial: JSX.IntrinsicElements["meshStandardMaterial"];
  }
}