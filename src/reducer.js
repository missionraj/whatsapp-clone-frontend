export const initialState = { 
    user:null,
    activeRoom:null
}
export const actionTypes = {
    SET_USER:'SET_USER',
    SET_ACTIVE_ROOM: 'SET_ACTIVE_ROOM'
}

const reducer = (state, action)=> { 
    switch (action.type) {
        case actionTypes.SET_USER :
            return { 
                ...state,
                user:action.user
            }
        case actionTypes.SET_ACTIVE_ROOM : 
            return {
                ...state,
                activeRoom:action.room
            }
        default : { 
            return state
        }
    }
}

export default reducer;