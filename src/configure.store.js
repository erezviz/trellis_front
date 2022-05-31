import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
// import rootReducer from './reducers'
import { boardReducer } from './store/board.reducer'
import { userReducer } from './store/user.reducer'

const rootReducer = {
    boardModule: boardReducer,
    userModule: userReducer
}
const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware()]

})


export default store