import { fetchData } from '../services/fetchData.js'
import { capitalizeText } from '../index.js'

const templateTableIngredients = async (config) => {
    const data = await fetchData('ingredients')
        .then((res) => {
            if (res !== undefined) {
                const displayValue = config.split('/')[0]
                const tableType = config.split('/')[1]

                const tableIngredients = document.createElement('template')

                tableIngredients.innerHTML = `
                <div class="table-responsive">
                    <table class="tabla table table-responsive-sm table-striped table-bordered table-hover text-center align-middle text-nowrap">
                        <caption style="caption-side:top; text-align:center">Lista de ingredientes</caption>
                        <thead>
                            <tr class="table table-dark">
                                <th scope="col" style="display:${displayValue}">
                                    Acciones
                                </th>
                                <th scope="col">
                                    Ingrediente
                                </th>
                                <th scope="col">
                                    Marca
                                </th>
                                <th scope="col">
                                    Precio
                                </th>
                                <th scope="col">
                                    Unidad de medida
                                </th>
                                <th scope="col">
                                    Categoria
                                </th>
                                <th scope="col" ${tableType==='modify' && 'class="fst-italic text-white-50"'}>
                                    Ultima Modificacion
                                </th>
                                <th scope="col" ${tableType==='modify' && 'class="fst-italic text-white-50"'}>
                                    Autor
                                </th>
                                <th scope="col" ${tableType==='modify' && 'class="fst-italic text-white-50"'}>
                                    Codigo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        
                        ${res.map((e, i)=>`
                            <tr>
                                <td style="display:${displayValue}">
                                    <button 
                                        class="btn btn-dark btn-sm mx-auto" style="display:${displayValue}"
                                        onmouseup="removeRow(event, 'ingredient', '${e._id}')"
                                    >
                                        Eliminar
                                    </button>
                                </td>                
                                <td scope="row" title="Ingrediente">
                                    ${tableType!=='modify'
                                        ?capitalizeText(e.ingrediente)
                                        :`<input 
                                            name="ingredient"
                                            type="text" 
                                            class="ingredient form-control w-auto border-0 bg-transparent text-black text-center rounded-0" 
                                            placeholder="Nombre del ingrediente" 
                                            required
                                            value="${capitalizeText(e.ingrediente)}"
                                            onblur="onChangeValue(${i})"
                                            oninput="onInputEnableBtn()"
                                        >`
                                    }
                                </td>
                                <td scope="row" title="Marca">
                                    ${tableType!=='modify'
                                        ?capitalizeText(e.marca)
                                        :`<input 
                                            name="trademark"
                                            type="text" 
                                            class="trademark form-control w-auto border-0 bg-transparent text-black text-center rounded-0" 
                                            placeholder="Marca" 
                                            required
                                            value="${capitalizeText(e.marca)}"
                                            onblur="onChangeValue(${i})"
                                            oninput="onInputEnableBtn()"
                                        >`
                                    }
                                </td>
                                <td scope="row" title="Precio">
                                    ${tableType!=='modify'
                                        ?e.precio
                                        :`<input 
                                            name="price"
                                            type="number" 
                                            class="price form-control w-auto border-0 bg-transparent text-black text-center rounded-0" 
                                            placeholder="0.00" 
                                            required
                                            value="${e.precio}"
                                            onblur="onChangeValue(${i})"
                                            oninput="onInputEnableBtn()"
                                        >`
                                    }
                                </td>
                                <td scope="row" title="Unidad de medida">
                                    ${tableType!=='modify'
                                        ?capitalizeText(e.unidad_medida)
                                        :`<select 
                                            name="measurement_unit"
                                            class="measurement_unit form-select form-select-sm w-100 h-100 border-0 bg-transparent" 
                                            aria-label="Measurement unit" 
                                            required
                                            onblur="onChangeValue(${i})"
                                            oninput="onInputEnableBtn()"
                                        >
                                            <option value="${capitalizeText(e.unidad_medida)}">${capitalizeText(e.unidad_medida)}</option>
                                            <option value="Chorro">Chorro</option>
                                            <option value="Gotas">Gotas</option>
                                            <option value="Kilos">Kilos</option>
                                            <option value="Latas">Latas</option>
                                            <option value="Litros">Litros</option>
                                            <option value="Pedazo">Pedazo</option>
                                            <option value="Pizca">Pizca</option>
                                            <option value="Unidad">Unidad</option>
                                        </select>`
                                    }
                                </td>
                                <td scope="row" title="Categoria">
                                    ${tableType!=='modify'
                                        ?capitalizeText(e.categoria)
                                        :`<select 
                                            name="category"
                                            class="category form-select form-select-sm w-auto h-100 border-0 bg-transparent" 
                                            aria-label="Category" 
                                            required
                                            onblur="onChangeValue(${i})"
                                            oninput="onInputEnableBtn()"
                                        > 
                                            <option value="${capitalizeText(e.categoria)}" selected>${capitalizeText(e.categoria)}</option>
                                            <option value="Almacen">Almacen</option>
                                            <option value="Verduleria">Verduleria</option>
                                            <option value="Fiambres">Fiambres</option>
                                            <option value="Lacteos">Lacteos</option>
                                            <option value="Carniceria">Carniceria</option>
                                            <option value="Embalajes">Embalajes</option>
                                            <option value="Energeticos">Energeticos</option>
                                        </select>`
                                    }
                                </td>
                                <td scope="row" title="Ultima modificacion" class="${tableType==='modify' && 'fst-italic text-black-50'}">
                                    ${tableType!=='modify'
                                        ?e.ultima_modificacion
                                        :`<input 
                                            name="today_date"
                                            type="text" 
                                            class="today_date form-control w-auto border-0 bg-transparent text-black-50 text-center rounded-0 shadow-none fst-italic" 
                                            placeholder="dd/mm/aaaa" 
                                            required
                                            disabled
                                            value="${e.ultima_modificacion}"

                                        >`
                                    }
                                </td>
                                <td scope="row" title="Autor" class="autor ${tableType==='modify' && 'fst-italic text-black-50'}">
                                    ${capitalizeText(e.autor)}
                                </td>
                                <td scope="row" title="Codigo" class="_id ${tableType==='modify' && 'fst-italic text-black-50'}">
                                    ${e._id}
                                </td>
                            </tr>`
                        )}
                        
                        </tbody>
                    </table>
                    
                </div>
                ${tableType==='modify'
                    ?`
                    <button 
                        onmouseup="onsubmitModifiedIngredients()"
                        class="btn btn-secondary btn-sm mt-2 mx-auto"
                        id="btn-submit-ingredients"
                        disabled
                    >
                        Enviar
                    </button>`
                    :''
                }                
            `
                const el = tableIngredients.content.firstElementChild
                const charactersToBeRemoved = el.firstChild
                el.removeChild(charactersToBeRemoved)

                return tableIngredients
            }
        })

    return data
}
export default templateTableIngredients