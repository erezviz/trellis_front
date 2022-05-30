
//? This cmp can be defined as a large spinner 
export const TrellisSpinner = ({isLarge}) => {


    return (
      <div className="trellis-spinner">

<span className={`spinner ${isLarge ? 'large' : ''}`}>
  <span className="bar bar1"></span>
  <span className="bar bar2"></span>
  <span className="bar bar3"></span>
</span>
      </div>
    )
}