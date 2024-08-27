// needed at least 2 shares to create result
export const defaultState = 0 // can be used anywhere, removable
export const usedState = 1 // can be used anywhere, not removable
export const chosenState = 2 // can be used with conjunction of at least 1 used or notUsed, not removable

const defaultBorder = 'border-gray-600'
const usedBorder = 'border-yellow-600'
const chosenBorder = 'border-orange-600'

const defaultPickedBorder = 'border-gray-300'

const defaultEncPickBorder = 'border-cyan-300'
const usedEncPickBorder = 'border-cyan-300'
const chosenEncPickBorder = 'border-cyan-300'

const defaultReusable = true
const usedReusable = true
const chosenReusable = false

const defaultRemovable = true
const usedRemovable = false
const chosenRemovable = false

export const shareState = new Map([
    [defaultState, {
        border: defaultBorder, 
        pickedBorder: defaultPickedBorder, 
        encPickBorder: defaultEncPickBorder,
        reusable: defaultReusable, 
        removable: defaultRemovable
    }],
    [usedState, {
        border: usedBorder, 
        // pickedBorder: usedPickedBorder, 
        encPickBorder: usedEncPickBorder,
        reusable: usedReusable, 
        removable: usedRemovable
    }],
    [chosenState, {
        border: chosenBorder, 
        // pickedBorder: chosenPickedBorder, 
        encPickBorder: chosenEncPickBorder,
        reusable: chosenReusable,
        removable: chosenRemovable
    }],
])