"use client"
import React, {useState } from "react";

export default function Home() {
  const defaultCoordinate = {A: [45,90], B: [45,90]};
  const [coordinateInput, setCoordinateInput] = useState(defaultCoordinate)
  const [distance, setDistance] = useState(0);

  const handleTextInput= (event) => {
    let {value, name} = event.target;
    let result = value.split(',').map(input=>{
      return(parseFloat(input) || 0)
    });
      setCoordinateInput({...coordinateInput, [name]: result});
    }

    const haversine = (lat1, lon1, lat2, lon2) => {
        // distance between latitudes
        // and longitudes
        let dLat = (lat2 - lat1) * Math.PI / 180.0;
        let dLon = (lon2 - lon1) * Math.PI / 180.0;
           
        // convert to radians
        lat1 = (lat1) * Math.PI / 180.0;
        lat2 = (lat2) * Math.PI / 180.0;
         
        // apply formulae
        let a = Math.pow(Math.sin(dLat / 2), 2) +
                   Math.pow(Math.sin(dLon / 2), 2) *
                   Math.cos(lat1) *
                   Math.cos(lat2);
        let rad = 6371;
        let c = 2 * Math.asin(Math.sqrt(a));
        return rad * c;
    }

    const onSubmit = async (event) => {
      try {
        event.preventDefault();
        let {A, B} = coordinateInput;
        let result = haversine(A[0], A[1], B[0], B[1])
        setDistance(result);
       } catch (error) {
           console.error(error);
    }
  
   };
   

  return (
    <main className="flex min-h-screen flex-col items-center my-2 justify-between p-24">
      <div className="z-10 w-full flex flex-col items-center justify-evenly my-2 font-mono text-lg lg:flex">
      <h1 className='text-2xl font-bold'>Distance Calculator</h1>
      <h2 className='text-xl'>Input Point A and Point B in decimal degree format with no spaces; input numbers before inputting &apos;-&apos; sign</h2>
        <div>
        <form className='flex flex-col justify-evenly my-2as'  onSubmit={onSubmit}>
          <label htmlFor='A'>Point A</label>
          <input  
            className='my-2 text-center w-48'   
            name="A"
            value={`${coordinateInput.A[0]},${coordinateInput.A[1]}`}
            onChange={handleTextInput}
          />
          <label htmlFor='B'>Point B</label>
          <input     
            name="B"
            value={`${coordinateInput.B[0]},${coordinateInput.B[1]}`}
            onChange={handleTextInput}
            className='my-2 text-center w-48'   
          />
          <button variant='text' className="border-solid border-black border-4 p-3 hover:bg-green-600">Calculate</button>

          
        </form>
        </div>

        <h1>{`Distance: ${distance}km`}</h1>
      </div>
    </main>
  )
}
