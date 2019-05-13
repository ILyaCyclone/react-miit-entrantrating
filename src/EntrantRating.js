'use strict';

const FilterTypes = {
  ALL: "all",
  ORIGINAL: "original"
}

function EntrantRating(props) {
  const [entrantGroups, setEntrantGroups] = React.useState(props.initialItems || []);
  const [filterState, setFilterState] = React.useState({ type: props.initialFilterType || FilterTypes.ALL, query: props.initialSearchQuery || "" });

  const [isInitialRender, setIsInitialRender] = React.useState(true);
  const [isLoadingInProgress, setIsLoadingInProgress] = React.useState(false);

  // axios cancel based on the WITHDRAWN cancelable promises proposal: https://github.com/tc39/proposal-cancelable-promises
  const [axiosCancelSource, setAxiosCancelSource] = React.useState();

  const querySearchParam = "query";
  const typeSearchParam = "status";

  React.useEffect(() => {
    console.log("useEffect");
    if ((isInitialRender === true && entrantGroups.length == 0) || isInitialRender === false) {
      fetchData();
    }

    setIsInitialRender(false);
  }, [filterState]);



  function fetchData() {
    let url = `https://rut-miit.ru/data-service/data/entrant-rating?id=${props.id}&${typeSearchParam}=${filterState.type}&context_path=/&id_lang=1`;
    // status=original&query=querytext
    if (filterState.query.length != 0) {
      url += `&${querySearchParam}=${filterState.query}`;
    }
    setPageUrlParameters(url);
    console.log("fetching from url: " + url);

    setIsLoadingInProgress(true);
    // fetch(url).then(res => res.json())
    //   .then(entrantGroups => {
    //     setEntrantGroups(entrantGroups);
    //     setIsLoadingInProgress(false);
    //   })

    if (axiosCancelSource) { axiosCancelSource.cancel(); }
    const newAxiosCancelSource = axios.CancelToken.source();
    setAxiosCancelSource(newAxiosCancelSource);
    axios.get(url, {
      timeout: 30000,
      cancelToken: newAxiosCancelSource.token
    })
      .then(res => {
        setEntrantGroups(res.data);
        setIsLoadingInProgress(false);
      })
      .catch(function (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          setIsLoadingInProgress(false);
          console.log(error);
        }
      })
      .finally(function () {
        // setIsLoadingInProgress(false);
      });
  }


  function setPageUrlParameters(axajUrl) {
    const ajaxSearchParams = new URLSearchParams(axajUrl);
    const pageSearchParams = new URLSearchParams(location.search);

    const ajaxUrlTypeFilter = ajaxSearchParams.get(typeSearchParam);
    if (ajaxUrlTypeFilter == FilterTypes.ALL) {
      pageSearchParams.delete(typeSearchParam);
    } else {
      pageSearchParams.set(typeSearchParam, ajaxUrlTypeFilter);
    }
    if (ajaxSearchParams.get(querySearchParam)) {
      pageSearchParams.set(querySearchParam, ajaxSearchParams.get(querySearchParam));
    } else {
      pageSearchParams.delete(querySearchParam);
    }
    history.replaceState(history.state, "", "?" + pageSearchParams.toString());
  }


  function handleFilterChange(newFilterState) {
    setFilterState(newFilterState);
  }

  return (
    <div class="row">
      <section className="applicants__list">
        Hello Entrant Rating

      <EntrantRatingFilter filterState={filterState}
          handleFilterChange={handleFilterChange}
        />

        {isLoadingInProgress && <p>Loading...</p>}
        group count: {entrantGroups.length}

        {entrantGroups.length > 0 ? (
          entrantGroups.map(entrantGroup => {
            const groupKey = `${entrantGroup.sortIndex1}-${entrantGroup.sortIndex2}-${entrantGroup.sortIndex3}-${entrantGroup.sortIndex4}`
            return <EntrantRatingGroup key={groupKey} group={entrantGroup} />
          })
        ) : (
            isInitialRender === false &&
            <span>No records</span>
          )}
      </section>
    </div>
  )
}
