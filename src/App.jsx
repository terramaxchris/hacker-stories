/* eslint-disable react/prop-types */
import * as React from 'react';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

function App() {
  console.log('App renders');
  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useStorageState('storage', 'React');
  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer, 
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    fetch(`${url}`)
      .then((response) => response.json())
      .then((result) => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });
      })
      .catch(() => dispatchStories({ type: 'STORIES_FETCH_FAILURE' })
    );
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStories({
      type: "REMOVE_STORY",
      payload: item,
    });
    console.log(stories)
  };

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);

  //   localStorage.setItem('search', event.target.value);
  // }
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  }
  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };
  
  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearchInput}>
          <strong>Search: </strong>
        </InputWithLabel>

        <button
          type='button'
          disabled={!searchTerm}
          onClick={handleSearchSubmit}>
            Submit
          </button>
      
      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading...</p>
      ) : ( 
      <List 
        list={stories.data} 
        onRemoveItem={handleRemoveStory}
      />
      )}
    </div>
  );
}

const InputWithLabel = ({ id, value, onInputChange, isFocused, children }) => {
  
  // A
  const inputRef = React.useRef();

  // C
  React.useEffect(() => {
    if(isFocused && inputRef.current) {
      // D
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    {/* B */}
    <input 
      ref={inputRef}
      id={id} 
      type="text" 
      value={value} 
      onChange={onInputChange} 
      />
  </>
)}

const List = ({ list, onRemoveItem }) => {
  return (
    <ul>
        {list.map((item) => (
          <Item 
            key={item.objectID} 
            item={item} 
            onRemoveItem={onRemoveItem} 
          />
        ))}
      </ul>
    );
  };

const Item = ({ item, onRemoveItem }) => {
  return (
    <li>
      <span>
        <a href={item.ul}>{item.title}, </a>
      </span>
      <span>{item.author}, </span>
      <span>{item.num_comments} comments, </span>
      <span>{item.points} points</span>
      <button type='button' onClick={() => onRemoveItem(item)}>Delete Book</button>
    </li>
  )
};

export default App;