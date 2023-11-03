const formRecipeMainInfo = async (config) => {
    const formRecipeMainInfoTemplate = document.createElement('template')
    const tableType = config

    formRecipeMainInfoTemplate.innerHTML = `
        <div class="d-flex flex-column gap-sm-2 p-5 mb-4 border">
            <div class="container d-flex justify-content-between p-0 mb-1">
                <label for="recipe-name" class="form-label text-dark m-0 w-50 text-truncate my-auto text-start">Nombre de la receta</label>
                <input 
                    ${tableType!=='list' ? 'autofocus' : ''}
                    type="text" 
                    title="Nombre de la receta"
                    id="recipe-name"
                    name="recipe_name"
                    class="${tableType==='list' ? ' shadow-none' : ''} form-control form-control-sm rounded w-50 border-secondary-subtle" 
                    placeholder="Pizza Fugazzeta, Empanadas Caprese, Sandwich de Milanesa.." 
                    required
                    ${tableType==='list' ? 'readonly' : ''}
                >
            </div>
            <div class="container d-flex justify-content-between p-0 pb-4 mb-1">
                <label for="category" class="form-label text-dark m-0 w-50 text-truncate my-auto text-start">Categoria</label>
                ${tableType==='list' 
                ?`<input 
                    type="text" 
                    title="Categoria"
                    id="category"
                    name="category"
                    class="form-control form-control-sm rounded w-50 border-secondary-subtle shadow-none" 
                    placeholder="Almacen, Verduleria, Carniceria.." 
                    readonly
                >
                `
                :`<select 
                    id="category"
                    name="category"
                    title="Categoria"
                    class="form-select form-select-sm rounded w-50 border-secondary-subtle" 
                    aria-label="Category"
                    required
                > 
                    <option value="" selected>Elija la categoria</option>
                    <option value="Panes">Panes</option>
                    <option value="Pizzas">Pizzas</option>
                    <option value="Empanadas">Empanadas</option>
                    <option value="Canastitas">Canastitas</option>
                    <option value="Sandwichs">Sandwichs</option>
                    <option value="Papas">Papas</option>
                    <option value="Picadas">Picadas</option>
                    <option value="Platos">Platos</option>
                    <option value="Torres de panqueques">Torres de panqueques</option>
                    <option value="Pastas">Pastas</option>
                    <option value="Ensaladas">Ensaladas</option>
                    <option value="Parrilla u horno">Parrilla u horno</option>
                    <option value="Comida mexicana">Comida mexicana</option>
                    <option value="Comida brasilera">Comida brasilera</option>
                    <option value="Varios">Varios</option>
                </select>`
                }
            </div>
            <div class="container d-flex justify-content-between p-0 mb-1">
                <label for="today-date" class="form-label ${tableType!=='list' ? 'text-black-50 fst-italic': ''} m-0 w-50 text-truncate my-auto text-start">
                    ${tableType==='add' ? 'Fecha de creacion' : 'Fecha de modificacion'}
                </label>
                <input 
                    type="text" 
                    title="${tableType==='add' ? 'Fecha de creacion' : 'Fecha de modificacion'}"
                    id="today-date"
                    name="today_date"
                    class="form-control form-control-sm rounded w-50 border-secondary-subtle shadow-none ${tableType!=='list' ? `fst-italic text-black-50`: ''}" 
                    placeholder="dd/mm/aaaa" 
                    required
                    readonly
                    tabindex="-1"
                >
            </div>
            ${tableType==='modify' 
            ?`
                <div class="container d-flex justify-content-between p-0 mb-1">
                    <label for="_id_recipe" class="form-label text-black-50 fst-italic m-0 w-50 text-truncate my-auto text-start">Codigo</label>
                    <input 
                        type="text" 
                        title="Codigo"
                        id="_id_recipe"
                        name="_id"
                        class="form-control form-control-sm rounded w-50 border-secondary-subtle shadow-none fst-italic text-black-50" 
                        placeholder="Codigo" 
                        required
                        readonly
                        tabindex="-1"
                    >
                </div>`
                :`
                <div class="container d-flex justify-content-between p-0 mb-1">
                    <label for="autor" class="form-label ${tableType==='add' ? 'text-black-50 fst-italic': ''} m-0 w-50 text-truncate my-auto text-start">Autor</label>
                    <input 
                        type="text" 
                        title="Autor"
                        id="autor" 
                        name="autor" 
                        class="form-control form-control-sm rounded w-50 border-secondary-subtle shadow-none ${tableType==='add' ? 'fst-italic text-black-50': ''}" 
                        readonly
                        placeholder="Autor"
                        tabindex="-1"
                    >
                </div>`
            }
        </div>
    `
    return formRecipeMainInfoTemplate
}
export default formRecipeMainInfo