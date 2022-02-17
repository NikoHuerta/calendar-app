import React from 'react'

export const OrdersScreen = () => {
  return (
    <div className='col-md-10'>  
      <div className='container-fluid mt-5'>
          <h2 className='display-5 text-center'>Orders</h2>
          <hr />
          <div class="table-responsive">
            <table className='table table-hover align-middle'>
              <thead>
                <tr className='table-dark'>
                  <th scope="col">#</th>
                  <th scope="col">Productos</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Origen</th>
                </tr>
              </thead>
              <tbody className='table-secondary'>
                <tr>
                  <th scope="row">1</th>
                  <td className='text-decoration-underline text-primary'>See this order!</td>
                  <td>Mark</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td className='text-decoration-underline text-primary'>See this order!</td>
                  <td>Jacob</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td className='text-decoration-underline text-primary'>See this order!</td>
                  <td>Larry</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className='table-dark'>
                  <th scope="col">#</th>
                  <th scope="col">Productos</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Origen</th>
                </tr>
              </tfoot>
            </table>
          </div>

      </div>
    </div>
  )
}
