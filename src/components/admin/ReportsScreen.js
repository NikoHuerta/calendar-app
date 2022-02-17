import React from 'react'

export const ReportsScreen = () => {
  return (
    
    <div className='col-md-10'>
      <div className='container-fluid mt-5'>
          <h2 className='display-5 text-center'>Reports</h2>
          <hr />
          
          <div class="d-grid gap-3">
            <button type="button" class="btn btn-secondary btn-block">Compras del mes</button>
            <button type="button" class="btn btn-secondary btn-block">Compras totales</button>
            <button type="button" class="btn btn-secondary btn-block">Total de articulos</button>
            <button type="button" class="btn btn-secondary btn-block">Total de clientes</button>
          </div>

      </div>
    </div>
  )
}
