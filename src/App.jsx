/* eslint-disable react/prop-types */
import * as React from 'react';

const welcome = {
  title: "React",
  greeting: "Hey",
};

const Search = (props) => {
  console.log("Search renders");

  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' onChange={props.onSearch}/>
      {/* dont't do onChange={handleChange()}, that's bad--will mean it gets the RETURN VALUE of the function, not the func itself */}
      <p>
        Searching for <strong>{props.searchTerm}</strong>.
      </p>
    </div>
  );
};

const List = (props) => {
  console.log("List renders");
    return (
    <ul>
        {props.list
          .map((item) => {
          return <li key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}  </a>
            </span>
            <span>{item.author}  </span>
            <span>{item.num_comments}  </span>
            <span>{item.points}  </span>
            </li>;
        })}
      </ul>
    );
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
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredStories = stories.filter((story) => story.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h1>{welcome.greeting}, {welcome.title}</h1>

      {/* B */}
      <Search onSearch={handleSearch} searchTerm={searchTerm}/>
      
      <hr />

      <List list={filteredStories}/>

    </div>
  );
}

export default App;