import { useState } from 'react'
import '../css/jdmenubar.css'
import '../css/style.css'
import { githubPage } from '../handlers/menuItem'
// import { github } from "../handlers/help";
// import './App.css'

export const menuItems = [
    { text : "File", subMenuItems : [
        { text : "Create canvas", handler: githubPage },
        { text : "Remove canvas" },
        { text : "Export as" },
    ]}, 
    { id : "edit", text : "Edit", subMenuItems : [
        { text : "Canvas size"},
    ]}, 
    { text : "Options", subMenuItems : [
        { text : "Algorithms", subMenuItems : [
            { text : "xor-c" },
        ]},
        { text : "Cryptography operations", subMenuItems: [
            { text : "Generate shares"},
            { text : "Merge shares"},
        ]},
    ]}, 
    { text : "About", subMenuItems: [
        { text : "Help", subMenuItems: [
            { text : "docs" },
        ]},
        { text : "Github page", handler: githubPage},
    ]}
]

export function Topbar() {
  const [count, setCount] = useState(0)
  
    return (
          <>
          {/* start top menu panel */}
          {/*<div className='bg-blueGray-medium-light text-white focus:bg-blueGray-medium-dark border-black h-7'>*/}
                <div id="menu-bar"></div>
          {/*</div>*/}
          {/* end top menu panel */}
          </>
    )
}