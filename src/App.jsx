/* eslint-disable react/prop-types */
import * as React from 'react';

const welcome = {
  title: "React",
  greeting: "Hey",
};

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
      autoFocus={isFocused} 
      onChange={onInputChange} 
      />
  </>
)}

const List = ({ list, deleteItem }) => {
  console.log("List renders");

    return (
    <ul>
        {list
          .map((item) => (
            <Item key={item.objectID} item={item} deleteItem={deleteItem} />
          )
      )}
      </ul>
    );
  }

const Item = ({ item, deleteItem }) => {
const handleDeleteItem = () => {
  deleteItem(item);
  console.log(item);
}

  return (
    <li>
      <span>
        <a href={item.ul}>{item.title}, </a>
      </span>
      <span>{item.author}, </span>
      <span>{item.num_comments} comments, </span>
      <span>{item.points} points</span>
      <button onClick={handleDeleteItem}>Delete Book</button>
    </li>
  )
}

const useStorageState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
}

const initialStories = [
  {
    title: 'React',
    url: 'https//reactjs.org',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https//redux.js.org',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  }
];

const getAsyncStories = () => 
  //Promise.resolve({ data: { stories: initialStories } });
  new Promise((resolve) => 
    setTimeout(
      () => resolve({data: {stories: initialStories } }),
      2000
    )
  );

function App() {
  console.log("App renders");

  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useStorageState('storage', 'React');
  const [stories, setStories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    getAsyncStories().then(result => {
      setStories(result.data.stories);
    });
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    getAsyncStories().then((result) => {
      setStories(result.data.stories)
      setIsLoading(false);
    })
    .catch(() => setIsError(true));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    localStorage.setItem('search', event.target.value);
  }

  const deleteStory = (item) => {
    //changeStories(stories.filter((story) => story.objectID !== ))
    console.log(item);
    const newStories = stories.filter((story) => item.objectID !== story.objectID);
    setStories(newStories);
  }

  const filteredStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div>
      <h1>{welcome.greeting}, {welcome.title}</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused={false}
        onInputChange={handleSearch}>
          <strong>Search: </strong>
        </InputWithLabel>
      
      <hr />

      {isError && <p>Something went wrong ...</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : ( 
      <List list={filteredStories} deleteItem={deleteStory}/>
      )}
    </div>
  );
}

export default App;