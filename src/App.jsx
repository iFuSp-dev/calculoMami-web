import { useState, useEffect } from 'react';
import './App.css';
import Table from './Table';

function App() {
  const [telas, setTelas] = useState([]);

  // Función para obtener las tareas (o telas)
  async function getTelas() {
    fetch('http://localhost:3000/telas', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((tasks) => {
        setTelas(tasks);
      });
  }

  useEffect(() => {
    getTelas();
  }, []);



  return (
    <>
      <Table telas={telas} />
    </>
  );
}

export default App;
