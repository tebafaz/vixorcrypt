import { useState } from 'react'
import { SharesModal } from './modals/shares'
// import './App.css'

export function Sidebar() {
  const [count, setCount] = useState(0)
  const onModalClick = () => {
    return
  }
  const onButtonClick = () => {
    return
  }
  const onSelect = () => {
    return
  }
  const addShares = () => {
    const sharesModal = document.querySelector('.modal')
    sharesModal.classList.replace("hidden", "visible")
  }
  let layerAttrs = []
  let images = []
  return (
    <>
        <SharesModal></SharesModal>
        {/* start Layers */}
        <div className='flex flex-col h-1/3 bg-blueGray-light'>
            <span className='flex-none pl-2 pointer-events-none text-white'>
            Shares
            </span>
            <div className='flex-auto'>
            {/* start inner overflow item */}
            <div className="relative w-full h-full bg-blueGray-medium-light">
                <div className='absolute inset-0 overflow-auto'>
                    <div className='ml-1 grid grid-cols-10 place-content-start gap-1'>
                        {layerAttrs.map((value) => {
                          return (
                                <div className="my-1 text-center bg-stone-50 hover:cursor-pointer" onClick={onSelect} key={value.id}>
                                {value.id}
                            </div>
                          )
                        })
                        }
                    </div>
                </div>
            </div>
            {/* end inner overflow item */}
            </div>
            <div className='flex h-7 items-center'>
            {/* <button className='h-full w-7 hover:bg-stone-100 px-2' title='add new layer' onClick={onPlusClick}>
                <img width={20} height={20} src={PlusPng} alt="add new layer" />
            </button>
            <button className='h-full w-7 hover:bg-stone-100 px-2' title='remove layer'>
                <img width={20} height={20} src={MinusPng} alt="remove layer" />
            </button> */}
            <button className='mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2' onClick={ addShares }>
              <span className='text-white text-sm'>Add</span>
            </button>
            <button className=' mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2'>
              <span className='text-white text-sm'>Remove</span>
            </button>
          </div>
        </div>
      {/* end Layers */}
      <div className='flex flex-1 flex-col h-1/3 border-y-2 border-stone-900 bg-blueGray-light'>
              <span className='flex-none pl-2 pointer-events-none text-white'>
                  Images
                </span>
                <div className='flex-auto'>
                  <div className="relative w-full h-full bg-blueGray-medium-light">
                    <div className='absolute inset-0 overflow-auto'>
                      <div className='ml-2 grid grid-cols-4 place-content-start gap-2'>
                        {images.map((value) => {
                          return (
                            <div className="flex justify-center max-w-[5rem] max-h-32 my-1" key={value.hash}>
                              <div className="bg-white hover:cursor-pointer" onClick={onSelect}>
                                <div className=' h-16  grid place-content-center'>
                                <img className='max-h-16 max-w-[4rem] m-auto' alt="" id={`img-${value.hash}`} src={value.base64}/>
                                </div>
                                <div className="p-2 max-w-[5rem] max-h-12">
                                  <p className="text-gray-900 text-xs overflow-ellipsis overflow-hidden h-8 break-words">{value.filename}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex h-7 items-center'>
                  {/* <button className='h-full w-7 hover:bg-stone-100 px-2'  type="button" onClick={importImages} title='add images'>
                    <img width={20} height={20} src={PlusPng} alt="add images" />
                  </button>
                  <button className='h-full w-7 hover:bg-stone-100 px-2' title='remove image'>
                    <img width={20} height={20} src={MinusPng} alt="remove images" />
                  </button> */}
                  <button className='mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2'>
                    <span className='text-white text-sm'>Add</span>
                  </button>
                  <button className=' mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2'>
                    <span className='text-white text-sm'>Remove</span>
                  </button>
                </div>
              </div>
              {/* start Layers to Images */}
        <div className='flex flex-1 flex-col h-1/3 bg-blueGray-light'>
                <span className='flex-none pl-2 pointer-events-none text-white'>
                  Results
                </span>
                <div className='flex-auto'>
                  {/* start inner overflow item */}
                  <div className="relative w-full h-full bg-blueGray-medium-light">
                    <div className='absolute inset-0 overflow-auto'>

                    </div>
                  </div>
                  {/* end inner overflow item */}
                </div>
                <div className='flex h-7 items-center'>
                  {/* <button className='h-full w-7 hover:bg-stone-100 px-2' title='add new encrypted set' onClick={onPlusClick}>
                    <img width={20} height={20} src={PlusPng} alt="add new encrypted set" />
                  </button>
                  <button className='h-full w-7 hover:bg-stone-100 px-2' title='remove encrypted set'>
                    <img width={20} height={20} src={MinusPng} alt="remove encrypted set" />
                  </button> */}
                  <button className=' mx-1 bg-blueGray-light hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark px-2'>
                    <span className='text-white text-sm'>Remove</span>
                  </button>
                </div>
              </div>
              {/* end Layers to Images */}
    </>
    
  )
}
