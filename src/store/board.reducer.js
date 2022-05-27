const initialState = {
    boards: [],
    currBoard: null
}


export function boardReducer(state = initialState, action) {
    var newState = state
    var board
    switch (action.type) {
        case 'SET_BOARDS':
            newState = { ...state, boards: action.boards }
            break
        case 'SET_BOARD':
            newState = { ...state, currBoard: action.board }
            break
        case 'REMOVE_BOARD':
            const lastRemovedBoard = state.boards.find(board => board._id === action.boardId)
            board = state.boards.filter(board => board._id !== action.boardId)
            newState = { ...state, board, lastRemovedBoard }
            break
        case 'ADD_BOARD':
            newState = { ...state, board: [...state.boards, action.board] }
            break
        // case 'UPDATE_BOARDS':
        //     board = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
        //     newState = { ...state, board }
        //     break
        case 'UPDATE_BOARD':
            // board = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            newState = { ...state, currBoard: action.board }
            console.log('hay from reducer');
            break
        default:
    }
    // For debug:
    window.boardState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState

}