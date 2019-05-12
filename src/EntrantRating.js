'use strict';

const FilterTypes = {
  ALL: "all",
  ORIGINAL: "original"
}

function EntrantRating(props) {
  const [entrantGroups, setEntrantGroups] = React.useState(props.initialEntrantGroups || []);
  const [filterState, setFilterState] = React.useState({type: props.initialFilterType || FilterTypes.ALL, query: props.initialSearchQuery || ""});

  const [isInitialRender, setIsInitialRender] = React.useState(true);
  const [isLoadingInProgress, setIsLoadingInProgress] = React.useState(false);

  React.useEffect(() => {
    console.log("useEffect");
    if ((isInitialRender === true && entrantGroups.length == 0) || isInitialRender === false) {
      fetchData();
    }

    setIsInitialRender(false);
  }, [filterState]);



  function fetchData() {
    let url = `https://rut-miit.ru/data-service/data/entrant-rating?id=${props.id}&status=${filterState.type}&context_path=/&id_lang=1`;
    // status=original&query=querytext
    if (filterState.query.length != 0) {
      url += `&query=${filterState.query}`;
    }
    
    console.log("fetching from url: " + url);

    setIsLoadingInProgress(true);
    fetch(url).then(res => res.json())
      .then(entrantGroups => {
        setEntrantGroups(entrantGroups);
        setIsLoadingInProgress(false);
      })
  }


  function handleFilterChange(newFilterState) {
      setFilterState(newFilterState);
  }

  return (
    <section className="applicants__list">
      Hello Entrant Rating
      {isLoadingInProgress && <p>Loading...</p>}
      {entrantGroups.length}

      <EntrantRatingFilter filterState={filterState}
          handleFilterChange={handleFilterChange}
          />

      {entrantGroups.map(entrantGroup => {
        const groupKey = `${entrantGroup.sortIndex1}-${entrantGroup.sortIndex2}-${entrantGroup.sortIndex3}-${entrantGroup.sortIndex4}`
        return <EntrantRatingGroup key={groupKey} group={entrantGroup} />
      }
      )}
    </section>
  )
}
