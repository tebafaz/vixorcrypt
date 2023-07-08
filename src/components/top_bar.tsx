import React from 'react'
// import ImportPng from '../images/import.png';

interface TopBarProps {
  importImages: (e: React.MouseEvent) => void
  setColoredMode: React.Dispatch<React.SetStateAction<boolean>>
  colorMode: boolean
}

const TopBar: React.FC<TopBarProps> = ({ importImages, setColoredMode, colorMode }) => {
  return (
        <>
        {/* start top menu panel */}
        <div className='flex bg-blueGray-medium-light h-7'>
          <div className='h-full w-full flow-root flex-none'>
            <div className='float-right h-full grid content-center mr-7'>
              {/* <select className='inline-block' name="image-processing-method" id="image-processing-method">
                {Object.entries(ea.encryptionAlgorithms).map(([key, value]) => (
                  <option key={key} title={value}>{key}</option>
                ))}
              </select> */}
              </div>
            <div className='float-right h-full mr-7'>
              {/* <button className='px h-full' title='colored mode'>
                <img className='mode-button' width={32} height={32} src={ClrSelPng} alt="colored mode" onMouseDown={changeMode} id='clr-mode'/>
              </button>
              <button className='px h-full' title='black and white mode'>
                <img className='mode-button' width={32} height={32} src={BWNSelPng} alt="black and white mode" onMouseDown={changeMode} id='bw-mode'/>
                </button> */}

              {/* <button className='px h-full' title='colored mode'>
                <img className='mode-button' width={85} height={32} src={EncToDec} alt="encryption mode" onMouseDown={changeMode} id='mode' title='encryption mode'/>
              </button> */}
            </div>
          </div>
        </div>
        {/* end top menu panel */}
        </>
  )
}

export default TopBar
