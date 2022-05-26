import { GroupPreview } from "./group-preview"

export const GroupList = ({groups, onOpenDetails}) => {

    return (
        <section className="group-list">
          {groups.map(group=> {  
         return   <GroupPreview key={group._id} group={group} onOpenDetails={onOpenDetails}/>
        }
            )}
        </section>
    )
}
