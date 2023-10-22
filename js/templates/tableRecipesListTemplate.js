import { fetchData } from "../services/fetchData.js"
import { capitalizeText } from '../index.js'

const templateTableRecipesList = async (config) => {
    const data = await fetchData('recipes')
        .then((res) => {
            if (res !== undefined) {
                const displayValue = config.split('/')[0]
                const tableType = config.split('/')[1]
                
                const tableRecipes = document.createElement('template')

                tableRecipes.innerHTML = `
                <div class="table-responsive" >
                    <table class="tabla table table-responsive-sm table-striped table-bordered table-hover text-center align-middle text-nowrap">
                        <caption style="caption-side:top; text-align:center">Lista de recetas</caption>
                        <thead>
                            <tr class="table table-dark">
                                <th style="display:${displayValue}">
                                    Acciones
                                </th>
                                <th scope="col">
                                    Receta
                                </th>
                                <th scope="col">
                                    Autor
                                </th>
                                <th scope="col">
                                    Codigo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        ${res.map((e)=>`
                            <tr 
                                onclick=
                                ${tableType==='modify'
                                    ? `selectedRow('${e._id}'); data-bs-dismiss='modal';`
                                    : ''
                                }                                
                            >
                                <td style="display:${displayValue}">
                                    <button 
                                        class="btn btn-dark btn-sm mx-auto" style="display:${displayValue}"
                                        onmouseup="removeRow(event, 'recipe', '${e._id}')"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                                <td scope="row" title="Receta" style="cursor:pointer">
                                    ${capitalizeText(e.nombre)}
                                </td>
                                <td scope="row" title="Autor" style="cursor:pointer">
                                    ${capitalizeText(e.autor)}
                                </td>
                                <td scope="row" title="Codigo" style="cursor:pointer">
                                    ${e._id}
                                </td>
                            </tr>`
                        )}

                        </tbody>
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
export default templateTableRecipesList