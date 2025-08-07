import { useEffect, useState } from "react";

const App = () => {
  const [tours, setTours] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch('http://localhost:3000/tours');
        const data = await responce.json();

        setTours(data);
      } catch(err){
        console.log('Error', err);
      }
    }

    fetchData();
  });

  if (!tours.length){
    return <p>Loading...</p>
  }

  return (
    <div>
      <h1>Tours</h1>
      {tours.map((tour, index) => (
        <ul key={index}>
          <li>Name: {tour.name}</li>
          <li>Price: {tour.price}</li>
          <li>Description: {tour.description}</li>
        </ul>
      ))}
    </div>
  )
}

export default App;