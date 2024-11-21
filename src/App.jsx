import { Suspense, useState, useEffect, useRef, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { useProgress } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import { CameraControl } from "./CameraControl";
import { NavigationButton } from "./NavigationButton";


import LoadingScreen from "./LoadingScreen";
import Home from "./Home";

/* const  About  = lazy(() => import('./About')); */
const  Featured  = lazy(() => import("./Featured"));
/* const  Contact = lazy(() => import("./Contact")); */

import * as THREE from 'three'

import "./App.css";

const Loader = ({ onStart }) => {
  const { progress } = useProgress();
  return <LoadingScreen progress={progress} onStart={onStart} />
};

const VideoScreen = ({ videoStart }) => { 
    const video = document.createElement('video');
  const videoMeshRef = useRef();
  useEffect(() => {
      
      video.src = 'http://toskuone.local/wp-content/uploads/2024/videos/novreel-updated.mp4';
      video.crossOrigin = 'anonymous';
      video.load();
      if(videoStart) video.play()
      video.loop = true;
         // Ensure video is muted to avoid autoplay issues
        
      const videoTexture = new THREE.VideoTexture(video);
     /*    videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter; */
        videoTexture.format = THREE.RGBFormat;
        videoTexture.encoding = THREE.sRGBEncoding;
        videoTexture.needsUpdate = true;
        videoMeshRef.current.material.map = videoTexture;
        
  }, []);

  return (
     <mesh
          ref={videoMeshRef}
          rotation={[0, 0, 0]}
          scale={.26}
          position={[-0.85, 1.95, -1.4]}
          >
          <planeGeometry args={[16.25,9]} />
          {/* <meshBasicMaterial/>  */}
      </mesh>
  )
}

const Experience = ({ setVideoStart }) => {
  const [view, setView] = useState('home');
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/')[1]
    const item = location.pathname.split('/')[2]
    setView(path === "" ? "home" : path)
    setItem(item === "" ? null : item)

  }, [location])

  return ( 
    <>
      <Canvas className='canvas' camera={{ fov: 47}} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      <color attach="background" args={["black"]} />
      <CameraControl view={view} item={item} /> 

     {/*  <OrbitControls />  */}
       
      <VideoScreen videoStart={setVideoStart}/>
        <Home />
        <Featured view={view} item={ item } />
{/*         <Contact />
        <About view={view} item={ item } /> */}

         {/* Home */}
        <NavigationButton position={[4.499, 1.844,-1.5 ]} rotation={[0, -Math.PI / 2, 0]} navigateTo="/about">ABOUT</NavigationButton>
        <NavigationButton position={[-4.499, 1.844, -2.0]} rotation={[0, Math.PI / 2, 0]} navigateTo="/featured">FEATURED WORK</NavigationButton>
        <NavigationButton position={[2.5 ,.7, -1.49]} rotation={[0, 0, 0]} navigateTo="/contact">CONTACT</NavigationButton>
        
        {/* Featured Work */}
        <NavigationButton position={[-24, 2.6, 4.5]} rotation={[0, Math.PI, 0]} navigateTo="/">HOME</NavigationButton>
        <NavigationButton position={[-24, 2.2, 4.5]} rotation={[0, Math.PI, 0]} navigateTo="/about">ABOUT</NavigationButton>
        <NavigationButton position={[-24, 1.8, 4.5]} rotation={[0, Math.PI, 0]} navigateTo="/contact">CONTACT</NavigationButton>
        <NavigationButton position={[-17, .3, -4.3]} rotation={[0, 0, 0]} onClick={() => setItem(null)} navigateTo="/featured">BACK</NavigationButton>
        
        {/* About */}
        <NavigationButton position={[24.8, 2.6, 2.5]} rotation={[0, -Math.PI / 2, 0]} navigateTo="/">HOME</NavigationButton>
        <NavigationButton position={[24.8, 2.2, 2.5]} rotation={[0, -Math.PI / 2, 0]} navigateTo="/featured">FEATURED WORK</NavigationButton>
        <NavigationButton position={[24.8, 1.8, 2.5]} rotation={[0, -Math.PI / 2, 0]} navigateTo="/contact">CONTACT</NavigationButton>
        <NavigationButton position={[17, .3, -4.3]} rotation={[0, 0, 0]} onClick={() => setItem(null)} navigateTo="/about">BACK</NavigationButton>
        <NavigationButton position={[17, .3, 4.3]} rotation={[0, Math.PI, 0]} onClick={() => setItem(null)} navigateTo="/about">BACK</NavigationButton>

    </Canvas>
    </>
  );
};


function App() {
  const [start, setStart] = useState(false);
     
  return (
    <div className="App">
    <Router>
        <Suspense fallback={null}>
        {
            <Routes><Route path="/*" element={start ? <Experience setVideoStart={start} /> : <Loader onStart={() => setStart(true)} /> } /></Routes>
        }
        </Suspense>
       
    </Router>
      
    </div>
  )
}

export default App



