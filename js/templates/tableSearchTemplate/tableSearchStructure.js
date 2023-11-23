import { addRowsToTable } from "./tableSearchTemplate.js" 

export const tableSearchStructure = async (queryType, page) => {
    const theadContent = () => {
        if(queryType==='Ingredientes'){
            return `
                <tr class="table table-dark">
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
                    <th scope="col">
                        Ultima Modificacion
                    </th>
                    <th scope="col">
                        Autor
                    </th>
                    <th scope="col">
                        Codigo
                    </th>
                </tr>
            `
        }

        if(queryType==='Recetas'){
            return `
                <tr class="table table-dark">
                    <th scope="col">
                        Receta
                    </th>
                    <th scope="col">
                        Categoria
                    </th>
                    <th scope="col">
                        Ultima Modificacion
                    </th>
                    <th scope="col">
                        Autor
                    </th>
                    <th scope="col">
                        Codigo
                    </th>
                </tr>
            `
        }
    }

    
    return `
        <div class="table-responsive">
            <table class="tabla table table-responsive-sm table-striped table-bordered table-hover text-center align-middle text-nowrap">
                <caption style="caption-side:top; text-align:center">Lista de ingredientes</caption>
                <thead>
                    ${ theadContent() }
                </thead>
                <tbody>
                    ${ await addRowsToTable({page}) }
                </tbody>
            </table>   
            <p id="bottom"></p>     
        </div>
    `    
}