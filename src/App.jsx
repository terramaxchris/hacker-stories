/* eslint-disable react/prop-types */
//import * as React from 'react';

const welcome = {
  title: "React",
  greeting: "Hey",
};

const Search = () => {
  const handleChange = (event) => {
    //synthetic event
    console.log(event);
    // value of target (here: input HTMP element)
    console.log(event.target.value);
  };

  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id='search' type='text' onChange={handleChange}/>
      {/* dont't do onChange={handleChange()}, that's bad--will mean it gets the RETURN VALUE of the function, not the func itself */}
    </div>
  )
}

const List = (props) => 
    <ul>
        {props.list.map((item) => {
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
  

function App() {

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
  ]

  return (
    <div>
      <h1>{welcome.greeting}, {welcome.title}</h1>

      <Search />
      
      <hr />

      <List list={stories}/>

    </div>
  );
}

export default App;