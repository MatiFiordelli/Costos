import { capitalizeText } from '../../index.js'

export const tableSearchTbodyRecipes = (data) => {

    return data.map((e, i)=>`
        <tr>
            <td scope="row" title="Receta">
                ${capitalizeText(e.name)}
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