import { useState } from "react"

export const CreateBoardModal = ({ isShown }) => {
    const [board, setBoard] = useState({
        title: '',
        createdBy: '',
        style: {}

    })
    const onHandleChange = ev => {
        const { value, name } = ev.target
        setBoard(prevBoard => ({ ...prevBoard, [name]: value }))
    }
    return (

        <section className="create-board-modal" style={{ display: `${isShown ? 'block' : 'none'}` }}>
            <form className="create-board-title flex">
                <label htmlFor="title">Board title<span>*</span></label>
                <input
                    onChange={onHandleChange}
                    type="text"
                    name="title"
                    id="title"
                    required
                />
                <button className="btn btn-blue">Create</button>
            </form>
        </section>

    )

}