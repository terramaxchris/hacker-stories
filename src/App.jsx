// import * as React from 'react';

const welcome = {
  title: "React",
  greeting: "Hey",
};

const list = [
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
]

const filteredList = list.filter((item) =>
  item.author.includes('a')
)

function Search() {
  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' />
    </div>
  )
}

function List() {
  return (
    <ul>
        {filteredList.map(function (item) {
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
  )
}

function App() {

  return (
    <div>
      <h1>{welcome.greeting}, {welcome.title}</h1>

      <Search />
      
      <hr />

      <List />

    </div>
  );
}

export default App;