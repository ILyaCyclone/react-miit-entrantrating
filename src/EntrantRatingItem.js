/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
'use strict';

function EntrantRatingItem(props) {
  const { entrant } = props;

  const RecordStatusColors = {
    0: "white",
    1: "green",
    2: "orange",
    3: "red",
    4: "gray"
  }
  const itemClassName = "applicants__legend-color_" + RecordStatusColors[entrant.recordStatus];

  return (
    <tr key={entrant.idE} className={itemClassName}>
      <td>{entrant.ratingIndex}</td>
      <td>
        <img className="applicants__photo" src={entrant.entrantPhotoPreviewUrl} alt="" />
      </td>
      <td>
        <a href="/people/990842" className="js-app-name">{entrant.entrantFio}</a>
        <div className="d-sm-none clearfix">
          <span className="float-left">{entrant.points}</span>
          <span className="float-right">{entrant.originalDocumentStatusShort}</span>
        </div>
      </td>
      <td>{entrant.points}</td>
      <td className="js-app-type">{entrant.originalDocumentStatusShort}</td>
    </tr>
  )
}
