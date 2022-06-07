
const Modal = ({boardId, groupId}) => {
 
    const onUpdateTask = (task, taskChanges) => {

        const taskCopy = JSON.parse(JSON.stringify(task))
        taskCopy.value = taskChanges
        dispatch(updateTask(boardId, groupId, taskCopy))
    }

}

function updateTask(boardId, groupId, taskToUpdate) {
    return async (dispatch) => {
        try {
            const updatedBoard = await boardService.updateTask(boardId, groupId, taskToUpdate)
            dispatch(getActionUpdateBoard(updatedBoard))

        } catch (err) {
            console.log('ERROR: cannot update task', err)
            showErrorMsg('We can\'t seem to update your task, please try again later')
        }
    }
}

function getActionUpdateBoard(board) {
    return {
        type: 'UPDATE_BOARD',
        board
    }
}