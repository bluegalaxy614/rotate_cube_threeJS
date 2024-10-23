import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ShaderMaterial, Mesh } from 'three';

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Apply a sine wave based on position and time
    float waveAmplitude = 0.4;
    float waveFrequency = 2.0;
    pos.z = sin(pos.x * waveFrequency + uTime) * waveAmplitude;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;

  void main() {
    gl_FragColor = vec4(vUv.x, vUv.y, 1.0, 1.0);
  }
`;

const WavePlane = () => {
    const meshRef = useRef<Mesh>(null!);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            const material = meshRef.current.material as ShaderMaterial;
            material.uniforms.uTime.value = clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef}
            rotation={[-Math.PI / 3, 0, 0]}
        >
            <planeGeometry args={[5, 5, 32, 32]} />
            <shaderMaterial
                uniforms={{ uTime: { value: 1.0 } }}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                side={2}
            />
        </mesh>
    );
};

export default WavePlane;