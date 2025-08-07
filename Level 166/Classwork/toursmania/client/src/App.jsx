import { useEffect, useState } from "react"

const App = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/tours');
        
        const data = await response.json();

        setTours(data);
      } catch (err) {
        console.log('Error', err)
      }
    }

    fetchData();
  }, []);

  if(!tours.length){
    return <p>Loading Tours...</p>
  }

  return (
    <div>
      {tours.map((tour, index) => (
        <ul key={index}>
          <li>Tour Name: {tour.name}</li>
          <li>Tour description: {tour.description}</li>
          <li>Tour price: {tour.price}</li>
        </ul>
      ))}
    </div>
  )
}

export default App;