/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
'use strict';

function EntrantRatingFilter(props) {
  const [query, setQuery] = React.useState("");
  const [submitedQuery, setSubmitedQuery] = React.useState(query);
  const { filterState } = props;
  //filterState.query || 
  

  function onQueryBlur(event) {
    const newQuery = event.target.value;
    if(newQuery != submitedQuery) {
      onQuerySubmit(newQuery);
    }
  }
  function onQueryKeyPress(event) {
    if(event.key === 'Enter') {
      onQuerySubmit(event.target.value);
    }
  }
  function onQuerySubmit(query) {
    setSubmitedQuery(query);
    props.handleFilterChange({
      ...filterState,
      query: query
    })
  }


  function onTypeChangeAll(event) {
    props.handleFilterChange({
      ...filterState,
      type: FilterTypes.ALL
    })
  }
  
  function onTypeChangeOriginal(event) {
    props.handleFilterChange({
      ...filterState,
      type: FilterTypes.ORIGINAL
    })
  }

  return (
    <div>
      <label className="custom-control custom-radio first-radio">
        <input className="custom-control-input"
          value={FilterTypes.ALL} checked={filterState.type == FilterTypes.ALL}
          onChange={onTypeChangeAll}
          type="radio" name="applicants" />
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">Все</span>
      </label>
      <label className="custom-control custom-radio">
        <input className="custom-control-input"
          value={FilterTypes.ORIGINAL} checked={filterState.type == FilterTypes.ORIGINAL}
          onChange={onTypeChangeOriginal}
          type="radio" name="applicants" />
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">Оригинал</span>
      </label>

      <input type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={onQueryKeyPress}
          onBlur={onQueryBlur} 
          name="applicant_name" className="form-control" placeholder="Введите имя" />
    </div>
  )
}
