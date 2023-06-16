"use client"
import Image from 'next/image'
import React, {useState, useEffect, useContext } from "react";
import { FormControl, TextField, Button } from '@mui/material'

export default function Home() {
  const defaultCoordinate = {A: [0,0], B: [0,0]};
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
           
        // convert to radiansa
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
        // Math.acos(
        //   Math.sqrt(Math.sin(((B[0]-A[0])* Math.PI / 180.0) /2)**2+(Math.cos(A[0] * Math.PI / 180.0)*Math.cos(B[0] * Math.PI / 180.0)*Math.sin(((B[1]-A[1])* Math.PI / 180.0 )/2)**2))
        //   // Math.sin(A[0])*Math.sin(B[0])+Math.cos(A[0])*Math.cos(B[0])*Math.cos(B[1]-A[1])
        //   )* 6371;
        setDistance(result);
        // setCoordinateInput(defaultCoordinate);
       } catch (error) {
           console.error(error);
    }
  
   };
   

  return (
    <main className="flex min-h-screen flex-col items-center my-2 justify-between p-24">
      <div className="z-10 w-full flex flex-col items-center justify-evenly my-2 font-mono text-lg lg:flex">
      <h1 className='text-2xl font-bold'>Distance Calculator</h1>
      <h2 className='text-xl'>Input Point A and Point B in decimal degree format with no spaces; input numbers before inputting &apos;-&apos; sign</h2>
        <form style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", maxWidth: "720px" }} onSubmit={onSubmit}>
          <TextField     
                        label="Point A"
                        name="A"
                        value={`${coordinateInput.A[0]},${coordinateInput.A[1]}`}
                        onChange={handleTextInput}
                        style={{  textAlign: 'center', width: "12rem", margin: "1px 1px"}}
                        margin="normal"
                        variant='filled'
                    />
          <TextField     
              label="Point B"
              name="B"
              value={`${coordinateInput.B[0]},${coordinateInput.B[1]}`}
              onChange={handleTextInput}
              style={{  textAlign: 'center', width: "12rem"}}
              margin="normal"
              variant='filled'
          />
          <button variant='text' className="border-solid border-black border-4 p-3 hover:bg-green-600">Calculate</button>

          
        </form>
        <h1>{`Distance: ${distance}km`}</h1>
      </div>
    </main>
  )
}
