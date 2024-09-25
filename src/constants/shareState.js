export const defaultState = 0
export const usedState = 1

const defaultBorder = 'border-gray-600'
const usedBorder = 'border-yellow-600'

const defaultReusable = true
const usedReusable = false

const defaultRemovable = true
const usedRemovable = false

export const shareState = new Map([
    [defaultState, {
        border: defaultBorder,
        reusable: defaultReusable,
        removable: defaultRemovable
    }],
    [usedState, {
        border: usedBorder, 
        reusable: usedReusable, 
        removable: usedRemovable
    }],
])
