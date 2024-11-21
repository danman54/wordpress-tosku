import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three'
import { useControls } from 'leva';

export function CameraControl({ view, item }) {
  
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState([0, 2, 5.28])
  const handleMouseMove = (event) => {
    setMouse({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    });
  };

   const { y } = useControls({
    y: {value: 0, min: -20, max: 20}
  })

  const { camera } = useThree()

    useEffect(() => {
      window.addEventListener('mousemove', handleMouseMove);
      console.log(view) 
      switch (view) {
        case "featured": {
          
          if (item == null) {
            setPosition([-18, 2, 0])
          } else {
            setPosition([-20, 2, 2])
          }
          // Rotate the camera by π/2 (90 degrees) around Y-axis
      /*     camera.rotation.y = Math.PI / 2;   */

          /* const quaternionRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
          camera.quaternion.multiplyQuaternions(quaternionRotation, camera.quaternion); */
   
        
          break;
        } case "contact": {
          setPosition([0, 2, 18])

          break;
        } case "about": {
          setPosition([18, 2, 0])

          break;
        }

        default: {
          setPosition([0, 2, 5.28])
        }
      }
         return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        };
      
    }, [view, item]);
  
  const vec = new THREE.Vector3();
  
  useFrame((state, xTime) => {
    state.camera.position.lerp(vec.set(position[0], position[1], position[2]), .1)
    
       switch (view) {
         case "featured": {

           if (item == null) {
             
             const quaternionY = new THREE.Quaternion()
             quaternionY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
            state.camera.quaternion.copy( quaternionY );

           
           } else { 
             const quaternionY = new THREE.Quaternion()
             quaternionY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (-mouse.x / 5))
             state.camera.quaternion.slerp(quaternionY, .01)
           
             const quaternionX = new THREE.Quaternion()
             quaternionX.setFromAxisAngle(new THREE.Vector3(1, 0, 0), (mouse.y / 5))
             state.camera.quaternion.slerp(quaternionX, .01)
             state.camera.updateProjectionMatrix();
             
           }
             //state.camera.quaternion.copy(quaternionY);

          /* const quaternionZ = new THREE.Quaternion()
          quaternionZ.setFromAxisAngle(new THREE.Vector3(0, 0, 1), (-mouse.y / 5))
          state.camera.quaternion.slerp(quaternionZ, .01) 

          const quaternionX = new THREE.Quaternion()
          quaternionX.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0)
           //state.camera.quaternion.multiplyQuaternions(quaternionX, state.camera.quaternion);
           
          state.camera.quaternion.copy(state.camera.quaternion.multiplyQuaternions(quaternionX, quaternionY));
           state.camera.quaternion.slerp(quaternionX, .01)   */
           


          //state.camera.quaternion.slerp(quaternionZ, .01) 

          /* console.log("mouse: ", mouse ); */
          state.camera.updateProjectionMatrix();

          break;
         } case "about": {

          const quaternionY = new THREE.Quaternion()
          quaternionY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), 3 * Math.PI / 2)
          //state.camera.quaternion.copy(quaternionY);

          const quaternionZ = new THREE.Quaternion()
          quaternionZ.setFromAxisAngle(new THREE.Vector3(0, 0, 1), (-mouse.y / 5))
          state.camera.quaternion.slerp(quaternionZ, .01) 

          const quaternionX = new THREE.Quaternion()
          quaternionX.setFromAxisAngle(new THREE.Vector3(1, 0, 0), 0)
           //state.camera.quaternion.multiplyQuaternions(quaternionX, state.camera.quaternion);
           
          state.camera.quaternion.copy(state.camera.quaternion.multiplyQuaternions(quaternionX, quaternionY));
          state.camera.quaternion.slerp(quaternionX, .01)  
          //state.camera.quaternion.slerp(quaternionZ, .01) 

          /* console.log("mouse: ", mouse ); */
          state.camera.updateProjectionMatrix();

          break;
         } case "contact": {
           
          const quaternionR = new THREE.Quaternion()
          quaternionR.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI )
           state.camera.quaternion.copy(quaternionR);
           
          const quaternionY = new THREE.Quaternion()
          quaternionY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (mouse.x / 5))
          state.camera.quaternion.slerp(quaternionY, .01)
           
          const quaternionX = new THREE.Quaternion()
          quaternionX.setFromAxisAngle(new THREE.Vector3(1, 0, 0), (mouse.y / 5))
           state.camera.quaternion.slerp(quaternionX, .01)
           state.camera.updateProjectionMatrix();

          break;
        }

        default: {
          const quaternionY = new THREE.Quaternion()
          quaternionY.setFromAxisAngle(new THREE.Vector3(0, 1, 0), (-mouse.x / 5))
          state.camera.quaternion.slerp(quaternionY, .01)
           
          const quaternionX = new THREE.Quaternion()
          quaternionX.setFromAxisAngle(new THREE.Vector3(1, 0, 0), (mouse.y / 5))
           state.camera.quaternion.slerp(quaternionX, .01)
           state.camera.updateProjectionMatrix();
        }
      }
    

  })
  return null;
};


