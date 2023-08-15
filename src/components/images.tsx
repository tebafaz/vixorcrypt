import React from 'react'
// import PlusPng from '../images/plus-symbol-button.png';
// import MinusPng from '../images/minus.png';
import { type ImgAttr } from '../models/image'
// import * as id from '../constants/id'

interface ImagesProps {
  importImages: (e: React.MouseEvent) => void
  images: ImgAttr[]
  isEncrypting: boolean
}

const Images: React.FC<ImagesProps> = ({ importImages, images, isEncrypting }) => {
  const onSelect = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (isEncrypting) {
      e.currentTarget.classList.toggle('bg-cyan-300')
    } else {
      e.currentTarget.classList.toggle('outline')
      e.currentTarget.classList.toggle('outline-1')
      e.currentTarget.classList.toggle('outline-cyan-500')
    }
  }

  return <>
              <div className='flex flex-1 flex-col h-1/3 border-y-2 border-stone-900 bg-blueGray-light'>
              <span className='flex-none pl-2 hover:pointer-events-none text-white'>
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
                  <button className='mx-1 bg-transparent px-2 border border-l-white border-t-white border-r-black border-b-black active:border-l-black active:border-t-black active:border-r-white active:border-b-white'>
                    <span className='text-white text-sm'>Add</span>
                  </button>
                  <button className=' mx-1 bg-transparent px-2 border border-l-white border-t-white border-r-black border-b-black active:border-l-black active:border-t-black active:border-r-white active:border-b-white'>
                    <span className='text-white text-sm'>Remove</span>
                  </button>
                </div>
              </div>
              </>
}

export default Images
