import React, { useRef } from 'react'
import { useGLTF, Html } from '@react-three/drei'



const Contact = (props) => {
  const { nodes, materials } = useGLTF('/TOSKU_Contact.glb')
  return (
      <group {...props} dispose={null} rotation={[0, -Math.PI / 2, 0]} position={[0, 0, -.5]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BuildingContact.geometry}
        material={materials['Cracked Concrete']}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Column_3.geometry}
        material={materials['Cracked Concrete']}
        position={[19.505, 0.135, -2.984]}
        scale={0.632}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keyboard.geometry}
        material={materials['Sci-Fi Metal Greeble (Keyboard)']}
        position={[25.8, 0.976, 1.278]}
        rotation={[0, 0, 0.149]}
        scale={0.07}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Computer_Hood.geometry}
        material={materials['Sci-Fi Metal Greeble (Medium)']}
        position={[26.94, 2.198, 0.848]}
        scale={[0.123, 1.105, 1.944]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Contact_Us_Computer_Wires.geometry}
        material={materials['Sci-Fi Metal Greeble (Small)']}
        position={[26.976, 2.827, -1.644]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.024}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Buttons.geometry}
        material={materials['Sci-Fi Metal Greeble (Keyboard)']}
        position={[25.376, 0.843, -0.625]}
        rotation={[0.001, -0.001, 0.16]}
        scale={0.066}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keyboard_Wire.geometry}
        material={materials['Sci-Fi Metal Greeble (Medium)']}
        position={[26.937, 0.866, -0.913]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.099}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keyboard_Wire_Ring_3.geometry}
        material={materials['Sci-Fi Metal Greeble (Medium)']}
        position={[26.936, 0.866, -1.668]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.096}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keyboard_Wire_Ring_2.geometry}
        material={materials['Sci-Fi Metal Greeble (Medium)']}
        position={[26.936, 0.866, -1.235]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.096}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keyboard_Wire_Ring_1.geometry}
        material={materials['Sci-Fi Metal Greeble (Medium)']}
        position={[26.936, 0.866, -0.818]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.096}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keyboard_Wire_Ring_4.geometry}
        material={materials['Sci-Fi Metal Greeble (Medium)']}
        position={[26.936, 0.528, -1.94]}
        scale={0.096}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keyboard_Wire_Ring_5.geometry}
        material={materials['Sci-Fi Metal Greeble (Medium)']}
        position={[26.936, 0.137, -1.94]}
        scale={0.096}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keyboard_Wire_Ring_6.geometry}
        material={materials['Sci-Fi Metal Greeble (Medium)']}
        position={[26.936, -0.338, -1.94]}
        scale={0.096}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Trackpad.geometry}
        material={materials['Sci-Fi Metal Greeble (Keyboard)']}
        position={[25.506, 1.228, 1.967]}
        rotation={[0, 0, 0.151]}
        scale={0.365}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Keyboard_Panel.geometry}
        material={materials['Sci-Fi Metal Greeble (Large)']}
        position={[26.007, 1.707, 0.848]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[1.665, 1, 1]}
      />
      <group
        position={[26.905, 2.172, 0.848]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[0.929, 0.929, 0.077]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={materials['Black Borders.005']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube011_1.geometry}
          material={materials['Screen Placeholder.005']}
        >
           <Html occlude center transform position={[0, 0, 0]} rotation={[0, Math.PI ,0]} scale={.25}>
            <div style={{ "width": '530px', "height": '280px', color: 'white', borderRadius: '5px', display: 'block' }}>
              <div className='contact-container' style={{"width":"100%"}}>
              <h2 style={{ "paddingBottom": "10px", "color": "white", "margin": "0px" }}>Contact</h2>
                <div className='first-row' style={{ "display": "flex", "flexDirection": "row", "width": "100%" }}>
                  <div className='nameInput' style={{"flexGrow": 1, "marginRight":"20px"}}>
                    <label htmlFor="name" className="" style={{"display":"block","fontWeight":500,"color":"white"}}>
                      Name
                    </label>
                    
                    <div style={{"position":"relative","marginTop":"0.5rem"}}>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className=""
                        style={{"fontSize":"20px","display":"block","paddingTop":"0.375rem","paddingBottom":"0.375rem","width":"100%","color":"white","backgroundColor":"transparent", "borderWidth":"0px","borderBottomWidth":"2px", "borderColor": "blue"}}
                      />
                      <div
                        aria-hidden="true"
                        style={{"position":"absolute","right":"0","left":"0","bottom":"0"}}
                      ></div>
                    </div> 
                  </div> {/* end input */}
                  <div className='emailInput' style={{"flexGrow": 1}}>
                    <label htmlFor="email" className="" style={{"display":"block","fontWeight":500,"color":"white"}}>
                      Email
                    </label>
                    
                    <div style={{"position":"relative","marginTop":"0.5rem"}}>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className=""
                        style={{"fontSize":"20px","display":"block","paddingTop":"0.375rem","paddingBottom":"0.375rem","borderWidth":"0","width":"100%","color":"white","backgroundColor":"transparent","borderBottomWidth":"2px", "borderColor": "blue"}}
                      />
                      <div
                        aria-hidden="true"
                        style={{"position":"absolute","right":"0","left":"0","bottom":"0","borderTopWidth":"1px","borderColor":"red"}}
                      ></div>
                    </div> 
                  </div> {/* end input */}
                  
                </div> {/* end first row */}
                <div className="second-row" style={{ "display": "flex", "flexDirection": "column" }}>
                  <div>
                   <label htmlFor="comment" className="sr-only">
                    Message
                  </label>
                  <div>
                    <textarea
                        id="comment"
                        name="comment"
                        rows={5}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        defaultValue={''}
                        style={{"fontSize":"20px", "marginTop":"0.5rem","backgroundColor":"transparent","borderWidth":"0px","borderBottomWidth":"2px", "borderColor": "blue", "color":"white", "width": "99%"}}
                    ></textarea>
                    <div
                        aria-hidden="true"
                        style={{"position":"absolute","right":"0","left":"0","bottom":"0"}}
                    ></div>
                  </div>
                  <button>Submit</button>
                </div>
                </div>{/*  end second row */}

              </div> {/* end contact-container */}
            </div> {/* end wrapper */}
          </Html>
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/TOSKU_Contact.glb')

export default Contact