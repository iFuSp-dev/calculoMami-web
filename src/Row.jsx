import { useState, useEffect } from 'react';
import './index.css';

function Row({ row_Id, rowId, rowName, rowSend, rowRecived, rowDiff, saveRow }) {
  // Definimos los estados para controlar los valores de los inputs
  const [name, setName] = useState(rowName);
  const [send, setSend] = useState(rowSend);
  const [recived, setRecived] = useState(rowRecived);
  const [diff, setDiff] = useState(rowDiff);

  // Recalculamos la diferencia siempre que cambien `send` o `recived`
  useEffect(() => {
    const calculatedDiff = send - recived;
    setDiff(calculatedDiff);
  }, [send, recived]); // Solo se recalcula cuando `send` o `recived` cambian

  return (
    <tr>
      <th>{rowId}</th>
      <td>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // Actualiza el estado cuando se escribe
        />
      </td>
      <td>
        <input
          type="number"
          value={send}
          onChange={(e) => setSend(Number(e.target.value))} // Asegúrate de que `send` es un número
        />
      </td>
      <td>
        <input
          type="number"
          value={recived}
          onChange={(e) => setRecived(Number(e.target.value))} // Asegúrate de que `recived` es un número
        />
      </td>
      <td>
        <input
          type="number"
          value={diff}
          readOnly // Solo lectura, se calcula automáticamente
        />
      </td>
      <td>
        <button>-</button>
      </td>
      <td>
        <button
          onClick={() => saveRow(row_Id, rowId, name, send, recived, diff)} // Usa el diff calculado aquí
        >
          Guardar
        </button>
      </td>
    </tr>
  );
}

export default Row;
