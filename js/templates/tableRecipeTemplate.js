import { fetchData } from "../services/fetchData.js"
import { capitalizeText } from '../index.js'

const templateTableRecipe = async (config) => {
    const data = await fetchData('recipes')
        .then((res) => {
            if (res !== undefined) {
                /* const displayValue = config.split('/')[0]
                const tableType = config.split('/')[1] */
                const tableType = config

                const tableRecipes = document.createElement('template')

                tableRecipes.innerHTML = `
                <div class="table-responsive">
                    <table id="table" class="table table-responsive-sm table-striped table-bordered table-hover text-center align-middle text-nowrap">
                        <caption style="caption-side:top; text-align:center">Receta</caption>
                        <thead>
                            <tr class="table table-dark">
                                ${tableType==='modify' || tableType=== 'add' 
                                ?`<th>
                                    Acciones
                                </th>`
                                :''
                                }
                                <th scope="col" class="w-100">
                                    Ingrediente
                                </th>
                                <th scope="col" w-auto">
                                    Cantidad
                                </th>
                                <th scope="col" class="${tableType==='modify' ? `text-white-50`: ''} w-auto">
                                    Marca
                                </th>
                                <th scope="col" class="${tableType==='modify' ? `text-white-50`: ''} w-auto">
                                    Precio
                                </th>
                                <th scope="col" class="${tableType==='modify' ? `text-white-50`: ''} w-auto">
                                    Costo
                                </th>
                                <th scope="col" class="${tableType==='modify' ? `text-white-50`: ''} w-auto">
                                    Unidad de medida
                                </th>
                                <th scope="col" class="${tableType==='modify' ? `text-white-50`: ''} w-auto">
                                    Codigo
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                        ${tableType==='list'
                        ?`
                        <tfoot>
                            <tr class="table table-secondary" title="Costo total">
                                <td 
                                    scope="row" 
                                    class="fw-bold align-middle"
                                >
                                    Costo Total: 
                                </td>
                                <td 
                                    scope="row" 
                                    colspan="6"
                                    class="text-start fw-bolder"
                                >
                                    <input 
                                        id="total-cost"
                                        name="total_cost" 
                                        type="text" 
                                        class="form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none fw-bold" 
                                        placeholder="0" 
                                        aria-label="Costo total" 
                                        required
                                        readonly
                                    >  
                                </td>
                            </tr>
                        </tfoot>`
                        :''
                        }
                    </table>
                    
                    ${tableType==='modify'
                    ?`
                    <table class="table table-responsive-sm text-start align-middle text-nowrap">
                        <tr>
                            <td class="bg-transparent border-0">
                                <button 
                                    class="btn btn-dark btn-sm mx-auto"
                                    onmouseup="addNewIngredient()"
                                >
                                    Agregar ingrediente
                                </button>
                            </td>
                        </tr>
                    </table>`
                    :''
                    }

                </div>
                ${tableType!=='list' 
                ?`
                <button
                    onmouseup=${tableType==='add' 
                                    ? 'onsubmitNewRecipe()' 
                                    : tableType==='modify' 
                                        ? 'onsubmitModifiedRecipe()' 
                                        : ''
                                }
                    id="btn-submit-recipe"
                    class="btn btn-secondary btn-sm mt-2 mx-auto"
                    disabled
                >
                    Enviar
                </button>`
                :''
                }
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