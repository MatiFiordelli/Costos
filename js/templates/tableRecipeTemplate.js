import { fetchData } from "../services/fetchData.js"
import { capitalizeText } from '../index.js'

const templateTableRecipe = async () => {
    const data = await fetchData('recipes')
        .then((res) => {
            if (res !== undefined) {
                const displayValue = localStorage.getItem('config').split('/')[0]
                const tableType = localStorage.getItem('config').split('/')[1]

                const tableRecipes = document.createElement('template')

                tableRecipes.innerHTML = `
                <div class="table-responsive">        
                    <table class="tabla table table-responsive-sm table-striped table-bordered table-hover text-center align-middle text-nowrap">
                        <caption style="caption-side:top; text-align:center">Receta</caption>
                        <thead>
                            <tr class="table table-dark">
                                <th style="display:${displayValue}">
                                    Acciones
                                </th>
                                <th scope="col">
                                    Ingrediente
                                </th>
                                <th scope="col">
                                    Cantidad
                                </th>
                                <th scope="col">
                                    Unidad de medida
                                </th>
                                <th scope="col">
                                    Precio
                                </th>
                                <th scope="col">
                                    Costo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        ${res.map((e)=>`
                            <tr>
                                <td style="display:${displayValue}">
                                    <button 
                                        class="btn btn-dark btn-sm mx-auto" style="display:${displayValue}"
                                        onclick="removeRow(event)"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                                <td scope="row" title="Ingrediente">
                                    121aaaasdasdasdasdasd

                                    <input 
                                        type="text" 
                                        title="Nombre del ingrediente"
                                        class="form-control w-auto border-0 bg-transparent text-black text-center rounded-0" 
                                        placeholder="Nombre del ingrediente" 
                                        required
                                        value="aaaasdasdasdasdasd"
                                    >
                                </td>
                                <td scope="row" title="Cantidad">
                                    bbbasdasdasdasdasd

                                    <input 
                                        type="text" 
                                        title="Cantidad"
                                        class="form-control w-auto border-0 bg-transparent text-black text-center rounded-0" 
                                        placeholder="0" 
                                        required
                                        value="1bbbasdasdasdasdasdasd"
                                    >
                                </td>
                                <td scope="row" title="Unidad de medida">
                                    cccasdasdasdasdasdasda

                                    <input 
                                        type="text" 
                                        id="measurement-unit" 
                                        title="Unidad de medida"
                                        class="form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none text-black-50 fst-italic" 
                                        placeholder="0" 
                                        aria-label="Measurement unit" 
                                        readonly
                                        value="asdasd"
                                    >
                                </td>
                                <td scope="row" title="Precio">
                                    dddddddasdasdasdasda
                                </td>
                                <td scope="row" title="Costo">
                                    eeeeeeasdasdasdasda
                                </td>
                            </tr>`
                        )}

                        </tbody>
                        <tfoot>
                            <tr>
                                <td class="bg-dark text-light fw-bold">
                                    Costo Total
                                </td>
                                <td colspan="5" class="fw-bold fst-italic text-center">
                                    $123
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            `

                const el = tableRecipes.content.firstElementChild
                const charactersToBeRemoved = el.firstChild
                el.removeChild(charactersToBeRemoved)

                return tableRecipes
            }
        })

    return data
}
export default templateTableRecipe