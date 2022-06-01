const initialState = {
    boards: [],
    currBoard: null,


}


export function boardReducer(state = initialState, action) {
    // var newState = state
    var board

    switch (action.type) {
        case 'SET_BOARDS':
            state = {...state, boards: action.boards }
            break
        case 'SET_BOARD':

            state = {...state, currBoard: action.board }
            break

        case 'REMOVE_BOARD':
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            board = state.boards.filter(board => board._id !== action.boardId)
            state = {...state, board, lastRemovedBoard }
            break
        case 'ADD_BOARD':
            state = {...state, board: [...state.boards, action.board] }
            break
            // case 'UPDATE_BOARDS':
            //     board = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            //     newState = { ...state, board }
            //     break
        case 'UPDATE_BOARD':
            board = {...action.board }
                // board = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            state = {...state, currBoard: board }
            break
        case 'SET_TASK':
            state = {...state, currTask: action.task }
            break
        default:
    }
    // For debug:
    window.boardState = state
        // console.log('Prev State:', state)
        // console.log('Action:', action)
        // console.log('New State:', newState)
    return state

}