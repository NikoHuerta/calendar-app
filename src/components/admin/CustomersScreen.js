import React from 'react'

export const CustomersScreen = () => {
  return (
    <div className='col-md-10'>
      <div className='container-fluid mt-5'>
          <h2 className='display-5 text-center'>Customers</h2>
          <hr />

          <div class="table-responsive">
            <table className='table table-hover align-middle'>
              <thead>
                <tr className='table-dark'>
                  <th scope="col">#</th>
                  <th scope="col">Nombre Completo</th>
                  <th scope="col">N° Pedidos</th>
                  <th scope="col">Ciudad</th>
                  <th scope="col">Origen</th>
                  <th scope="col">Contacto</th>
                </tr>
              </thead>
              <tbody className='table-secondary'>
                <tr>
                  <th scope="row">1</th>
                  <td>Nicolas Huerta Fuentes</td>
                  <td>3</td>
                  <td>Santiago</td>
                  <td>Sitio</td>
                  <td>nhuerta@protonmail.com</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Nathalie Aranda Allende</td>
                  <td>5</td>
                  <td>Santiago</td>
                  <td>Google</td>
                  <td>naranda@protonmail.com</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Amparo Huerta Aranda</td>
                  <td>10</td>
                  <td>Santiago</td>
                  <td>Facebook</td>
                  <td>pamparito@protonmail.com</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className='table-dark'>
                  <th scope="col">#</th>
                  <th scope="col">Nombre Completo</th>
                  <th scope="col">N° Pedidos</th>
                  <th scope="col">Ciudad</th>
                  <th scope="col">Origen</th>
                  <th scope="col">Contacto</th>
                </tr>
              </tfoot>
            </table>
          </div>

      </div>
    </div>
  )
}
