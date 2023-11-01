const templateTableRecipeTbodyContent = async (config, objRow) => {

    const tableRecipeTbodyContent = document.createElement('template')
    const tableType = config

    tableRecipeTbodyContent.innerHTML = `
        <tr>
            ${tableType!=='list' ? 
            `<td scope="row">
                <button 
                    class="btn btn-dark btn-sm mx-auto"
                    ${
                    tableType==='add' ? `onmouseup="removeRow(event, null, null); onEmptyingTable('addrecipe')"` : 
                    tableType==='modify' ? `onmouseup="removeRow(event, 'function in modificaReceta', onInputEnableBtn); onEmptyingTable('modifyrecipe');"` : ''
                    }                    
                >
                    Eliminar
                </button>
            </td>`
            : ''}

            <td scope="row" title="Ingrediente">
                ${
                tableType==='add' || tableType==='list'
                ?`
                <input 
                    type="text" 
                    name="ingredient"
                    class="ingredient form-control w-auto border-0 bg-transparent text-black text-center rounded-0 shadow-none" 
                    placeholder="Nombre del ingrediente" 
                    required
                    readonly
                    value="${objRow.ingredient}"
                >`
                : tableType==='modify'
                ?`
                <select 
                    name="ingredient"
                    class="ingredient select-ingredient form-select form-select-sm w-auto border-0 bg-transparent text-black text-center rounded-0" 
                    aria-label="Nombre del ingrediente"
                    placeholder="Elija el ingrediente" 
                    required
                    data-ingredient="${objRow.ingredient}"
                    onchange="updateMeasurementUnitSelect(this)"
                > 
                    <option value="${objRow.ingredient}">${objRow.ingredient}</option>
                </select>`
                :''
                }
            </td>
            <td scope="row" title="Cantidad">
                <input 
                    type="number" 
                    name="quantity"
                    class="quantity form-control w-auto border-0 bg-transparent text-black text-center rounded-0 ${tableType==='list' ? ' shadow-none ' : tableType==='add' ? ' shadow-none ' : ''}" 
                    placeholder="0" 
                    step="any"
                    min="0"
                    max="999"
                    required
                    ${tableType==='add' || tableType==='list' ? 'readonly' : ''}
                    value="${objRow.quantity}"
                    ${tableType==='modify' ? `oninput="updateQuantity(this)"`: ''}
                >
            </td>
            <td scope="row" title="Marca">
                <input 
                    name="trademark"
                    type="text" 
                    class="trademark form-control w-auto border-0 bg-transparent ${tableType==='modify' ? ' text-black-50' : 'text-black'} text-center rounded-0 shadow-none" 
                    placeholder="Marca" 
                    required
                    readonly
                    value="${objRow.trademark}"
                >
            </td>
            <td scope="row" title="Precio">
                <input 
                    type="number" 
                    name="price"
                    class="price form-control w-auto border-0 bg-transparent ${tableType==='modify' ? ' text-black-50' : 'text-black'} text-center rounded-0 shadow-none" 
                    placeholder="0.00" 
                    required
                    readonly
                    value="${objRow.price}"
                >
            </td>
            <td scope="row" title="Costo">
                <input 
                    type="number" 
                    name="cost-value"
                    class="cost-value form-control w-auto border-0 bg-transparent ${tableType==='modify' ? ' text-black-50' : 'text-black'} text-center rounded-0 shadow-none" 
                    required
                    readonly
                    placeholder="Costo"
                    value="${objRow.cost}"
                >
            </td>
            <td scope="row" title="Unidad de medida">
                <input 
                    type="text" 
                    name="measurement-unit"
                    class="measurement-unit form-control w-auto border-0 bg-transparent ${tableType==='modify' ? ' text-black-50 fst-italic' : 'text-black'} text-center rounded-0 shadow-none" 
                    required
                    readonly
                    placeholder="Unidad de medida"
                    value="${objRow.measurement_unit}"
                    ${tableType==='modify' ? 'tabindex="-1"' : ''}
                >
            </td>
            <td scope="row" title="Codigo">
                <input 
                    type="text" 
                    ${tableType==='modify' ? 'name="codigo"' : 'name="_id"'}
                    class="${tableType==='modify' ? 'codigo text-black-50 fst-italic ' : '_id text-black'} form-control w-auto border-0 bg-transparent text-center rounded-0 shadow-none" 
                    placeholder="0" 
                    aria-label="Codigo" 
                    required
                    readonly
                    value="${objRow._id}"
                >
            </td>
        </tr>
    `
    return tableRecipeTbodyContent
}

export default templateTableRecipeTbodyContent