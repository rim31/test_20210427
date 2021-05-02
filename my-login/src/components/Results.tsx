import React from 'react'
import { IUsers } from '../interfaces/interfaces';
export default function Results() {
  const [results, setResults] = React.useState<IUsers[]>([])

  // GETTER : function get only a movie 
  const getResults = () => {
    try {
      fetch(`https://raw.githubusercontent.com/Pompette/technical_test/master/users.json`)
        .then(response => response.json())
        .then((res) => {
          setResults(res.users);
          console.log(`res`, res);
        }
        );
    } catch (err) {
      console.error(err.message);
    }
  };

  React.useEffect(() => {
    getResults();
  }, [])

  return (
    <div>
      <h1>results</h1>
      <table>
        {results && (results.map((row: IUsers) => {
          return (<div key={row.id}>{row.name}</div>)
        }))}
      </table>
    </div>
  )
}
