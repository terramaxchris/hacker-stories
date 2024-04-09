/* eslint-disable react/prop-types */
import * as React from 'react';

const welcome = {
  title: "React",
  greeting: "Hey",
};

const InputWithLabel = ({ id, value, onInputChange, children }) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input id={id} type="text" value={value} onChange={onInputChange} />
  </>
)

const List = ({ list }) => {
  console.log("List renders");
    return (
    <ul>
        {list
          .map(({objectID, ...item}) => (
            <Item key={objectID} {...item} />
          )
      )}
      </ul>
    );
  }

const Item = ({ url, title, author, num_comments, points }) => {
  return (
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
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
  const stories = [
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

  // eslint-disable-next-line no-unused-vars
  const [searchTerm, setSearchTerm] = useStorageState('storage', 'React');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    localStorage.setItem('search', event.target.value);
  }

  const filteredStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h1>{welcome.greeting}, {welcome.title}</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}>
          <strong>Search: </strong>
        </InputWithLabel>
      
      <hr />

      <List list={filteredStories}/>

    </div>
  );
}

export default App;