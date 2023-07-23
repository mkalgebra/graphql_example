import React, { useState } from 'react';

import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'https://spacex-production.up.railway.app/',
});

function App(){
  const [data, setData] = useState()

  async function getData() {
    const data = await client
    .query({
      query: gql`
      query($limit: Int) {
          launchesPast(limit: $limit) {
              id
              mission_name
              rocket {
              rocket_name
              }
              upcoming
              launch_date_unix
          }
      }
  `,
  fetchPolicy: "network-only",
    variables: {
        limit: 10,
    }
    })
    .then((result) => result)

    return data
  }

  async function handleClick(){
      const res = await getData()
      setData(res.data.launchesPast)
  }

  return(<>
    <div>
      <button onClick={handleClick}>Get data</button>
      <ul>
        {data?.length && data.map(i=>{return(
          <li key={i.id}>{i.mission_name}</li>
          )})}
      </ul>
    </div>
  </>)
};

export default App;
