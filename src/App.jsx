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

function App() {
  console.log("App renders");
  const [stories, setStories] = React.useState([
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
  ]);

  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useStorageState('storage', 'React');

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

      <List list={filteredStories} deleteItem={deleteStory}/>

    </div>
  );
}

export default App;