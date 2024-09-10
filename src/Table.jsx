import './Table.css';
import Row from './Row';
import { useState, useEffect } from 'react';

function Table({ telas, }) {

  async function crearTela() {
    const newRow = {
      id: rows.length + 1,
      nombre: '',
      enviado: 0,
      recibido: 0,
      diferencia: 0,
    };

    fetch('http://localhost:3000/nuevaTela', {
      method: 'POST',
      body: JSON.stringify( {newRow} ), // Envía solo el ID como se espera en el servidor
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      if (res && res.insertedId) { // Asegúrate de que la respuesta contiene un insertedId
        setRows([...rows, newRow]); // Actualiza el estado con la nueva fila añadida
      }
    })
    .catch((error) => {
      console.error("Error al crear la nueva tela:", error);
    });
  }

  async function saveRow(_id,id,nombre,send,recived,diff){

    

    fetch('http://localhost:3000/updateTela',{
      method:'PUT',
      body:JSON.stringify({_id,id,nombre,send,recived,diff}),
      headers:{
        "Content-type": "application/json"
      }
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      
    })

  }



  // Inicializamos el estado con las telas pasadas por el prop
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(telas); // Sincroniza `rows` con `telas` cuando `telas` cambie
  }, [telas]);






  const rowElements = rows.map((row) => (
    <Row
      key={row._id} // Necesario para las listas en React
      row_Id={row._id}
      rowId={row.id}
      rowName={row.nombre}
      rowSend={row.enviado}
      rowRecived={row.recibido}
      rowDiff={row.diferencia}
      saveRow={saveRow}
    />
  ));

  return (
    <>
      <button type="button" onClick={crearTela}>
        +
      </button>
      <button type="button">-</button>

      <table id="speadsheet" >
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Enviados</th>
            <th>Recibidos</th>
            <th>Diferencia</th>
          </tr>
        </thead>
        <tbody>
          {/* Renderizar las filas aquí */}
          {rowElements}
        </tbody>
      </table>
    </>
  );
}

export default Table;
