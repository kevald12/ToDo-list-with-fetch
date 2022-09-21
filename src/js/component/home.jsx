import React, { useEffect, useState } from "react";


const Home = () => {
 
   
    const [toDo, setToDo] = useState([]);
    const [tarea, setTarea] = useState([]);
    const onSubmit = (e) => {
      e.preventDefault();
      if (tarea != ""){
        setToDo((prev) => [...prev, {label:tarea, done:false}]);
        setTarea("");
      }
    };
    console.log(toDo);
    const elementDelete = (dIndex) => {
      setToDo(toDo.filter((e, i) => i != dIndex));
    };
    useEffect(() =>{ 
      fetch("https://assets.breatheco.de/apis/fake/todos/user/kev",{
        method: "GET"
      })
      
      .then((response) => response.json())
      .then((todoList) => {
          console.log(todoList);
          setToDo(todoList)
      .catch((error) => console.log (error));
      });
  },[]);

  const nuevaTarea =()=>{
  fetch("https://assets.breatheco.de/apis/fake/todos/user/kev",{
    method: "PUT",
    body: JSON.stringify([
			...toDo,
			{ label: tarea, done: false }
		]),
    headers: {
      "Content-Type": "application/json"
    },
  })
  .then(response => {
      console.log(response.ok); // will be true if the response is successfull
      console.log(response.status); // the status code = 200 or code = 400 etc.
      console.log(response.text()); // will try return the exact result as string
      return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
  })
  .then(data => {
      //here is were your code should start after the fetch finishes
      console.log(data); //this will print on the console the exact object received from the server
  })
  .catch(error => {
      //error handling
      console.log(error);
  });
}
    return (
      <div className="container bg-dark">
        <div>
          <h1 className="text-center text-light">ToDo's</h1>
          <form onSubmit={onSubmit}>
            <div className="input-group d-flex justify-content-center">
              <input
                value={tarea}
                type="text"
                placeholder="Tareas por hacer"
                onChange={(e) => setTarea(e.target.value)}
              />
            </div>
            <div>
              {toDo.map((element, dIndex) => {
                return (
                  <div key={dIndex} className="d-flex justify-content-between my-3 col-4 mx-auto shadow p-3 mb-5 bg-body rounded">
                    <p >{element.label}</p>
                    <button
                      type="button"
                      className="btn btn-danger opacity-50"
                      onClick={() => elementDelete(dIndex)}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                );
              })}
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Home;