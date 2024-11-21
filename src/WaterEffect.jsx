import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Water } from './helpers/Water';



const waterNormalsPath = '/waternormals.jpg';

// CustomMeshComponent.js
import React, { useRef, useEffect, useState } from 'react';




const WaterEffect = ({position}) => {
  const meshRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(10, 10, 1000, 1000);

      const texture = new THREE.TextureLoader().load(waterNormalsPath); 
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      console.log(texture);

      let waterOptions = {
        textureWidth:  1000,
        textureHeight: 1000,
        waterNormals: texture,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        /* waterColor: 0x00faff, */
        waterColor: 0x00faff,
        distortionScale: 2,
      }

      const water = new Water(geometry, waterOptions);
      water.rotation.x = -Math.PI / 2;
      meshRef.current = water;
      setIsLoaded(true);
      console.log(meshRef.current);

    
  }, []);

  useFrame(() => {
    if (meshRef.current != undefined) {
      meshRef.current.material.uniforms['time'].value += 0.15 / 360.0;
    }
  
  });

  return isLoaded && <primitive position={position} object={meshRef.current} />;
  
};


export default WaterEffect;
