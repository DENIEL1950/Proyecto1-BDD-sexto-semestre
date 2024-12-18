import React, { useState } from 'react';
import axios from 'axios';
import { UilSearch } from '@iconscout/react-unicons';

function Search() {
  const [searchId, setSearchId] = useState('');
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setError('');
      setClientData(null);

      if (!searchId.trim()) {
        setError('Por favor ingrese un ID');
        return;
      }

      const response = await axios.get(`http://localhost:3001/api/clients/${searchId}`);
      
      if (response.data) {
        setClientData(response.data);
      } else {
        setError('No se encontró el cliente');
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.response?.data?.error || 'Error al buscar el cliente');
    }
  };

  return (
    <div className="search-container">
      <h2>Buscar Cliente</h2>
      
      <div className="search-box">
        <select className="search-type-select" defaultValue="id">
          <option value="id">ID</option>
        </select>

        <input
          type="number"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Ingrese ID del cliente"
          className="search-input"
        />

        <button 
          onClick={handleSearch}
          className="search-button"
          disabled={!searchId.trim()}
        >
          <UilSearch /> Buscar
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {clientData && (
        <div className="client-data">
          <h3>Datos del Cliente</h3>
          <table className="customer-table">
            <tbody>
              <tr>
                <td>ID:</td>
                <td>{clientData.customer_id}</td>
              </tr>
              <tr>
                <td>Nombre:</td>
                <td>{clientData.first_name}</td>
              </tr>
              <tr>
                <td>Apellido:</td>
                <td>{clientData.last_name}</td>
              </tr>
              <tr>
                <td>Dirección:</td>
                <td>{clientData.address}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{clientData.email}</td>
              </tr>
              <tr>
                <td>Teléfono:</td>
                <td>{clientData.phone_number}</td>
              </tr>
            </tbody>
          </table>

          {clientData.order_id && (
            <div className="order-section">
              <h4>Información de la Orden</h4>
              <table className="orders-table">
                <tbody>
                  <tr>
                    <td>Orden ID:</td>
                    <td>{clientData.order_id}</td>
                  </tr>
                  <tr>
                    <td>Fecha:</td>
                    <td>{clientData.order_date}</td>
                  </tr>
                  <tr>
                    <td>Total:</td>
                    <td>${clientData.total_price}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search; 