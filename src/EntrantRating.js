'use strict';

const SearchTypes = {
  ALL: "all",
  ORIGINAL: "original"
}

function EntrantRating(props) {
  const [entrantGroups, setEntrantGroups] = React.useState(props.initialEntrantGroups || []);
  const [searchQuery, setSearchQuery] = React.useState(props.initialSearchQuery || "");
  const [searchType, setSearchType] = React.useState(props.initialSearchType || SearchTypes.ALL);

  const [isInitialRender, setIsInitialRender] = React.useState(true);
  const [isLoadingInProgress, setIsLoadingInProgress] = React.useState(false);

  React.useEffect(() => {
    console.log("useEffect");
    if ((isInitialRender === true && entrantGroups.length == 0) || isInitialRender === false) {
      fetchData();
    }

    setIsInitialRender(false);
  }, [searchQuery, searchType]);



  function fetchData() {
    let url = `https://rut-miit.ru/data-service/data/entrant-rating?id=${props.id}&status=${searchType}&context_path=/&id_lang=1`;
    // status=original&query=querytext
    if (searchQuery.length != 0) {
      url += `&query=${searchQuery}`;
    }
    console.log("fetching from url: " + url);

    setIsLoadingInProgress(true);
    fetch(url).then(res => res.json())
      .then(entrantGroups => {
        setEntrantGroups(entrantGroups);
        setIsLoadingInProgress(false);
      })
  }

  return (
    <section className="applicants__list">
      Hello Entrant Rating
      {isLoadingInProgress && <p>Loading...</p>}
      {entrantGroups.length}
      {entrantGroups.map(entrantGroup => {
        const groupKey = `${entrantGroup.sortIndex1}-${entrantGroup.sortIndex2}-${entrantGroup.sortIndex3}-${entrantGroup.sortIndex4}`
        return <EntrantRatingGroup key={groupKey} group={entrantGroup} />
      }
      )}
    </section>
  )
}
