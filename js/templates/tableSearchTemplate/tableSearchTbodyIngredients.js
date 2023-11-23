import { capitalizeText } from '../../index.js'

export const tableSearchTbodyIngredients = (data) => {

    return data.map((e, i)=>`
        <tr>
            <td scope="row" title="Ingrediente">
                ${capitalizeText(e.ingredient)}
            </td>
            <td scope="row" title="Marca">
                ${capitalizeText(e.trademark)}
            </td>
            <td scope="row" title="Precio">
                ${e.price}
            </td>
            <td scope="row" title="Unidad de medida">
                ${capitalizeText(e.measurement_unit)}
            </td>
            <td scope="row" title="Categoria">
                ${capitalizeText(e.category)}
            </td>
            <td scope="row" title="Ultima modificacion">
                ${e.last_modification}
            </td>
            <td scope="row" title="Autor">
                ${capitalizeText(e.autor)}
            </td>
            <td scope="row" title="Codigo">
                ${e._id}
            </td>
        </tr>`
    )  
}