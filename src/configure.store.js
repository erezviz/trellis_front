import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
// import rootReducer from './reducers'
import { boardReducer } from './store/board.reducer'

const rootReducer = {
    boardModule: boardReducer,
}
const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()]

})


export default store