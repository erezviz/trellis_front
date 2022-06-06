export const WarningModal = ({onDeleteGroup, groupId}) =>{
    console.log('group id in warning modal', groupId);


    return (
        <section className="warning-modal flex">
            <p>This action will permanently remove this list. There is no undo</p>
            <button onClick={()=> onDeleteGroup( groupId)} className="btn btn-danger">Delete</button>
        </section>
    )
}