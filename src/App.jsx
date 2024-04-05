/* eslint-disable react/prop-types */
import * as React from 'react';

const welcome = {
  title: "React",
  greeting: "Hey",
};

const Search = (props) => {
  console.log("Search renders");
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    //C
    props.onSearch(event);
  };

  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' onChange={handleChange}/>
      {/* dont't do onChange={handleChange()}, that's bad--will mean it gets the RETURN VALUE of the function, not the func itself */}
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
    </div>
  );
};

const List = (props) => {
  console.log("List renders");
    return (
    <ul>
        {props.list
          .filter((item) => item === item)
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

  //A
  const handleSearch = (event) => {
    //D
    console.log("D: " + event.target.value);
  };

  return (
    <div>
      <h1>{welcome.greeting}, {welcome.title}</h1>

      {/* B */}
      <Search onSearch={handleSearch}/>
      
      <hr />

      <List list={stories}/>

    </div>
  );
}

export default App;