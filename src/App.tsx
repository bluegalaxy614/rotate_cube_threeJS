import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
// import RotatingCube from './components/RotatingCube';
import WavePlane from './components/WavePlane';
// import LineDrawingTool from './components/LineDrawingTool';

const App = () => {
  return (
    <div className="h-screen w-screen">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />

        {/* <RotatingCube /> */}
        <WavePlane />
        {/* <LineDrawingTool /> */}
      </Canvas>
    </div>
  );
};

export default App;