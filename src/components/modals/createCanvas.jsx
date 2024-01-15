export function CreateCanvas() {
    const openSharesModal = () => {
        return
    }

    const sharesModalEnter = () => {
        return
    }

    return (
        <div className='hidden fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-opacity-40 bg-black modal' id='shares-modal' onClick={ openSharesModal }>
            <div className='absolute bg-blueGray-light inset-0 m-auto p-8 w-96 h-40 text-center'>
                <span className='text-white'>Write the number of shares</span>
                <input type="number" max={1000} min={2} defaultValue={2} pattern={'d'} className='invalid:bg-red-200 m-2' id='layer-count'></input><br />
                <span className='text-xs text-red-200'>min=2 max=1000</span><br />
                <button className='hover:bg-blueGray-medium-light active:bg-blueGray-medium-dark p-1 text-white' onClick={ sharesModalEnter }>Enter</button>
            </div>
        </div>
    )
}
