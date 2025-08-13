import { useEffect, useState } from "react"

const App = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/cars');

        const data = await response.json();

        setCars(data);
      } catch(err){
        console.log('Error', err);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>Cars</h1>
      {cars.length ? (
        cars.map((car, index) => (
          <ul key={index}>
            <h3>ID: {car.id}</h3>
            <li>Car Make: {car.make}</li>
            <li>Car Model: {car.model}</li>
            <li>Car Year: {car.year}</li>
            <li>Car Price: {car.price}</li>
          </ul>
        ))
      ): (
        <p>No Cars Found</p>
      )}
    </>
  )
}

export default App