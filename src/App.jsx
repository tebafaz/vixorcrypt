import { useState, useEffect } from 'react'
import { Topbar } from './components/topbar'
import { Sidebar } from './components/sidebar'
import { MenuBar } from './menubar/jdmenubar'
import { menuItems } from './components/topbar'
import './css/jdmenubar.css'
import './css/style.css'
// import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  useEffect(() => {
    // menubar
    const menuBar = document.getElementById('menu-bar')
    if (menuBar == null) {
        console.log('menubar is null')
      return
    }
    console.log('menubar is not null')
    const menubar = new MenuBar(menuBar, menuItems)
    menubar.update()

    // close modal
    window.onclick = function(event) {
      var modals = document.querySelectorAll('.modal')
      for (var i = 0; i < modals.length; i++) {
        if (event.target == modals[i]) {
          modals[i].classList.replace('visible', 'hidden')
        }
      }
    }
  }, [])

  const mouseOnWheelHandler = () => {
    return
  }

  const setFileHandler = () => {
    return
  }
  // window.onbeforeunload = function() {
  //   return "Data will be lost if you leave the page, are you sure?";
  // };
  let canvasW = 1
  let canvasH = 1
  const [craftMode, setCraftMode] = useState('encrypt')
  const [canvas, setcanvas] = useState(null)
  return (
    <>
    <input multiple type='file' hidden accept='image/*' id='image-input' onChange={ setFileHandler }/>
      <div className='w-full h-screen flex flex-col'>
        <Topbar />
        { /* start workspace */ }
        <div className='flex-auto'>
          <div className='w-full h-full flex flex-row'>
            { /* start main canvas panel */ }
            <div className='flex-1 bg-blueGray-medium-dark border-t-2 border-r-2 border-stone-900'>
              <div className='flex flex-col h-full'>
                <div className='flex flex-row h-full w-full'>
                  <div className='flex-auto relative overflow-scroll' id='canvas-holder-2' onWheel={ mouseOnWheelHandler }>
                    <div className='absolute m-auto inset-0 grid content-center justify-center outline-dashed outline-1 outline-stone-900' id='canvas-holder-1'>
                      <span className='text-blueGray-light text-4xl pointer-events-none'>Create canvas in the `File` section on the top left corner</span>
                      <canvas className='align-top' id='main-canvas'>
                        { /* canvas */ }
                      </canvas>
                    </div>
                  </div>
                </div>
                <div className='flex-none h-7 bg-blueGray-light font-light text-sm'>
                  <span className='pl-2 text-sm text-white'>Algorithm: { 'xor-c' } Mode: { craftMode } Canvas size: { canvasW }x{ canvasH }</span>
                </div>
              </div>
            </div>
            { /* end main canvas panel */ }
            { /* start layers panel */ }
            
            <div className='flex flex-col w-96 max-h-full h-full bg-stone-300'>
              <div className='flex flex-row justify-evenly w-96 h-10 bg-blueGray-medium-dark'>
                <button onClick={() => setCraftMode('encrypt')} className={`px-2 bottom-0 h-8 w-24 mb-0 mt-auto ${craftMode == 'encrypt' ? 'bg-blueGray-light' : 'bg-blueGray-medium-light'}`}>
                  <span className='text-white'>Encrypt</span>
                </button>
                <button onClick={() => setCraftMode('decrypt')} className={`px-2 bottom-0 h-8 w-24 mb-0 mt-auto ${craftMode == 'decrypt' ? 'bg-blueGray-light' : 'bg-blueGray-medium-light'}`}>
                  <span className='text-white'>Decrypt</span>
                </button>
              </div>
              <div className='flex-auto'>
              <Sidebar></Sidebar>
              </div>
                
     
            </div>
            { /* end layers panel */ }
          </div>
        </div>
        { /* end workspace */ }
      </div>
    </>
  )
}

export default App
