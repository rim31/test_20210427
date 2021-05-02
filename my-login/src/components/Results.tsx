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

  const RenderTableHeader = () => {
    return (<>
      <th>name</th>
      <th>age</th>
      <th>dev</th>
      <th>company</th>
      <th>years</th>
      <th>features</th>
    </>
    )
  }

  return (
    <div>
      {/* <a href="/">BACK</a> */}
      <h1>results</h1>
      <table id="myTable">
        <tbody>
          <RenderTableHeader />
          {results && (results.map((row: IUsers) => {
            return (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.age}</td>
                <td>{row.dev}</td>
                <td>{row.company}</td>
                <td>{row.years}</td>
                <td>{row.features.length}</td>
              </tr>)
          }))}
        </tbody>
      </table>
    </div>
  )
}
