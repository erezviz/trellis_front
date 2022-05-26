import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './reducers'
import { boardReducer } from './store/board.reducer'

const rootReducer = {
  boardModule: boardReducer,
}
const store = configureStore({
  reducer: rootReducer,
})


export default store
