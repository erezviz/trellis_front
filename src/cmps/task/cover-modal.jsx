import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { utilService } from "../../services/util.service";
import { updateTask } from '../../store/board.action'

export const CoverModal = (props) => {
    const dispatch = useDispatch()
    const [chosenColor, setColor] = useState(null)
  
    const colors = [
        { name: 'clr1', color: "#7BC86C" },
        { name: 'clr2', color: "#F5DD29" },
        { name: 'clr3', color: "#FFAF3F" },
        { name: 'clr4', color: "#EF7564" },
        { name: 'clr5', color: "#CD8DE5" },
        { name: 'clr6', color: "#5BA4CF" },
        { name: 'clr7', color: "#29CCE5" },
        { name: 'clr8', color: "#6DECA9" },
        { name: 'clr9', color: "#FF8ED4" },
        { name: 'clr10', color: "#172B4D" },
    ]

    const onChooseColor = (color) => {
        const updatedTask = utilService.getDeepCopy(props.task)
        if (color === props.task) {
            setColor(prevColor => prevColor = null)
        } else {
            setColor(prevColor => prevColor = color)

        }
        updatedTask.cover = chosenColor
        console.log('updated color', updatedTask.cover);
        dispatch(updateTask(props.boardId, props.groupId, updatedTask))
    }

    return (
        <div className="color-palette">
            {colors.map(currColor => {

                return <button onClick={() => onChooseColor(currColor.color)} key={currColor.color}
                    className={`color-to-choose ${(props.task.cover === currColor.color) && 'chosen'}`}
                    style={{ backgroundColor: currColor.color }}></button>

            })}
        </div>
    )
}