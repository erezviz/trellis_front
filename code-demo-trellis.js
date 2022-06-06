import { boardService } from "./src/services/board.service"
import { eventBusService } from "./src/services/event-bus.service"
import { getActionUpdateBoard } from "./src/store/board.action"










export function updateTask(boardId, groupId, taskToSave) {
    return async(dispatch) => {
        try {

            const updatedBoard = await boardService.updateTask(boardId, groupId, taskToSave)
            dispatch(getActionUpdateBoard(updatedBoard))

        } catch (err) {
            console.log('ERROR: cannot update task', err)
            eventBusService.emit()
            throw err
        }
    }
}