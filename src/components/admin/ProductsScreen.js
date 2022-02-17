import React from 'react'

export const ProductsScreen = () => {
  return (
    <div className='col-md-10'>
      <div className='container-fluid mt-5'>
          <h2 className='display-5 text-center'>Products</h2>
          <hr />

          <div class="table-responsive">
            <table className='table table-hover align-middle'>
              <thead>
                <tr className='table-dark'>
                  <th scope="col">Stock</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Imagen</th>
                </tr>
              </thead>
              <tbody className='table-secondary'>
                <tr>
                  <th scope="row">10</th>
                  <td>Llavero bandera chile</td>
                  <td>500</td>
                  <td><i className="fs-5 bi bi-card-image"></i></td>
                </tr>
                <tr>
                  <th scope="row">25</th>
                  <td>Llavero bandera argentina</td>
                  <td>500</td>
                  <td><i className="fs-5 bi bi-card-image"></i></td>
                </tr>
                <tr>
                  <th scope="row">23</th>
                  <td>Llavero bandera peru</td>
                  <td>500</td>
                  <td><i className="fs-5 bi bi-card-image"></i></td>
                </tr>
                <tr>
                  <th scope="row">23</th>
                  <td>Llavero bandera bolivia</td>
                  <td>500</td>
                  <td><i className="fs-5 bi bi-card-image"></i></td>
                </tr>
              </tbody>
              <tfoot>
                <tr className='table-dark'>
                  <th scope="col">Stock</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Imagen</th>
                </tr>
              </tfoot>
            </table>
          </div>

      </div>
    </div>
  )
}
