/* eslint-disable react/prop-types */
import * as React from 'react';

const welcome = {
  title: "React",
  greeting: "Hey",
};

const Search = ({ search, onSearch }) => {
  console.log("Search renders");
  //const {search, oneSearch } = props;

  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input 
        id='search' 
        type='text' 
        value={ search } 
        onChange={ onSearch }
      />
      {/* dont't do onChange={handleChange()}, that's bad--will mean it gets the RETURN VALUE of the function, not the func itself */}
      <p>
        Searching for <strong>{ search }</strong>.
      </p>
    </div>
  );
};

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
  const [searchTerm, setSearchTerm] = React.useState(localStorage.getItem('search') || 'React');

  React.useEffect(() => {
    localStorage.setItem('search', searchTerm);
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    localStorage.setItem('search', event.target.value);
  }

  const filteredStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h1>{welcome.greeting}, {welcome.title}</h1>

      {/* B */}
      <Search onSearch={handleSearch} search={searchTerm}/>
      
      <hr />

      <List list={filteredStories}/>

    </div>
  );
}

export default App;