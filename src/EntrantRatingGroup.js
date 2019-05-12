'use strict';

function EntrantRatingGroup(props) {
    const { group } = props;

    return (
        <React.Fragment>
            <div className="entrant-rating__group">
                <h3>{group.botName}</h3>
                {group.targetOrganization &&
                    <h4>{group.targetOrganization}
                        <small>(план приёма: {group.targetPlan})</small>
                    </h4>
                }
                <h4>{group.receptionStatus}
                    <small>({group.receptionType})</small>
                </h4>

            </div>
                <div className="applicants__list-table-wrap applicants__list-table-wrap--bottom">
                    <table className="table table--done js-applicants cost">
                        <tbody>
                            {group.entrants.map(entrant => 
                                <EntrantRatingItem key={entrant.idE} entrant={entrant} />
                            )}
                        </tbody>
                    </table>
                </div>
        </React.Fragment>
    )
}
