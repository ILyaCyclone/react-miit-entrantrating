'use strict';

function EntrantRatingGroup(props) {
    const {group} = props;
  return (
    <div className="entrant-rating__group">
        <h3>{group.botName}</h3>
        {group.targetOrganization &&
            <h4>{group.targetOrganization}
                <small>(план приёма: {group.targetPlan})</small>
                </h4>
        }
    </div>
  )
}
