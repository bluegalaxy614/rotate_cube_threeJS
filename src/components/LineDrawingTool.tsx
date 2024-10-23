import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const LineDrawingTool = () => {
  const { mouse, viewport } = useThree();
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState<THREE.Vector3 | null>(null);
  const [endPos, setEndPos] = useState<THREE.Vector3 | null>(null);
  const lineRef = useRef<THREE.Line | any>(null);
  const boxRef = useRef<THREE.Mesh>(null);

  const handlePointerDown = () => {
    const startX = (mouse.x * viewport.width) / 2;
    const startY = (mouse.y * viewport.height) / 2;
    setStartPos(new THREE.Vector3(startX, startY, 0));
    setEndPos(new THREE.Vector3(startX, startY, 0));
    setIsDrawing(true);
  };

  const handlePointerMove = () => {
    if (!isDrawing || !startPos) return;

    const endX = (mouse.x * viewport.width) / 2;
    const endY = (mouse.y * viewport.height) / 2;
    const newEndPos = new THREE.Vector3(endX, endY, 0);
    setEndPos(newEndPos);

    if (lineRef.current) {
      const positions = new Float32Array([startPos.x, startPos.y, startPos.z, newEndPos.x, newEndPos.y, newEndPos.z]);
      lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }

    if (boxRef.current) {
      const midpoint = new THREE.Vector3().lerpVectors(startPos, newEndPos, 0.5);
      boxRef.current.position.set(midpoint.x, midpoint.y, midpoint.z);
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  useFrame(() => {
    handlePointerMove();
  });

  return (
    <>
      <line ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial color="blue" />
      </line>

      {startPos && endPos && (
        <mesh ref={boxRef}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshBasicMaterial color="red" />
        </mesh>
      )}

      <mesh
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        position={[0, 0, 0]}
        scale={viewport.width}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <meshBasicMaterial opacity={0} transparent />
      </mesh>
    </>
  );
};

export default LineDrawingTool;