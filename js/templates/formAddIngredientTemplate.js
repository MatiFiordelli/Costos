const formAddIngredientTemplate = document.createElement('template')

formAddIngredientTemplate.innerHTML = `
    <form 
        id="form" 
        onsubmit="return false"
    >
        <div class="d-flex flex-column gap-sm-2 p-5 mb-2 border">
            <div class="container d-flex justify-content-between p-0">
                <label for="ingredient" class="label form-label text-dark">Ingrediente</label>
                <input 
                    autofocus
                    type="text" 
                    id="ingredient" 
                    class="input form-control form-control-sm rounded w-50 border-secondary-subtle" 
                    placeholder="Nombre del ingrediente" 
                    required
                    title="Nombre del ingrediente"
                >
            </div>	
            <div class="container d-flex justify-content-between p-0">
                <label for="trademark" class="label form-label text-dark">Marca</label>
                <input 
                    type="text" 
                    id="trademark" 
                    class="input form-control form-control-sm rounded w-50 border-secondary-subtle" 
                    placeholder="Marca" 
                    required
                    title="Marca"
                >
            </div>	
            <div class="container d-flex justify-content-between p-0">
                <label for="price" class="label text-dark">Precio</label>
                <div class="input input-group d-flex flex-nowrap w-50 rounded m-0 p-0">
                    <span class="input-group-text rounded-end-0 border-end-0 border-secondary-subtle py-0 my-0">$</span>
                    <input 
                        type="number" 
                        id="price" 
                        class="input form-control form-control-sm rounded rounded-start-0 border-start-0 border-secondary-subtle  py-0 my-0" 
                        aria-label="Price"
                        placeholder="0.00"
                        step="0.10"
                        required
                        step="any"
                        title="Precio"
                    >
                </div>
            </div>
            <div class="container d-flex justify-content-between p-0">
                <label for="measurement-unit" class="label form-label text-dark">Unidad de media</label>
                <select 
                    id="measurement-unit" 
                    class="input form-select form-select-sm w-50 h-auto border-secondary-subtle" 
                    aria-label="Measurement unit" 
                    required
                    title="Unidad de medida"
                >
                    <option value="" selected>Elija la unidad de medida</option>
                    <option value="Chorro">Chorro</option>
                    <option value="Gotas">Gotas</option>
                    <option value="Kilos">Kilos</option>
                    <option value="Latas">Latas</option>
                    <option value="Litros">Litros</option>
                    <option value="Pedazo">Pedazo</option>
                    <option value="Pizca">Pizca</option>
                    <option value="Unidad">Unidad</option>
                    <option value="Pote">Pote</option>
                </select>
            </div>
            <div class="container d-flex justify-content-between p-0 pb-4">
                <label for="category" class="label form-label text-dark">Categoria</label>
                <select 
                    id="category" 
                    class="input form-select form-select-sm w-50 h-auto border-secondary-subtle" 
                    aria-label="Category" 
                    required
                    title="Categoria"
                > 
                    <option value="" selected>Elija la categoria</option>
                    <option value="Almacen">Almacen</option>
                    <option value="Verduleria">Verduleria</option>
                    <option value="Fiambres">Fiambres</option>
                    <option value="Lacteos">Lacteos</option>
                    <option value="Carniceria">Carniceria</option>
                    <option value="Embalajes">Embalajes</option>
                    <option value="Energeticos">Energeticos</option>
                </select>
            </div>
            <div class="container d-flex justify-content-between p-0">
                <label for="today-date" class="form-label text-black-50 fst-italic">Fecha de creacion</label>
                <input 
                    type="text" 
                    title="Fecha de creacion"
                    id="today-date"
                    name="today_date"
                    class="form-control form-control-sm rounded w-50 border-secondary-subtle shadow-none fst-italic text-black-50" 
                    placeholder="dd/mm/aaaa" 
                    required
                    readonly
                    tabindex="-1"
                >
            </div>
            <div class="container d-flex justify-content-between p-0">
                <label for="autor" class="form-label text-black-50 fst-italic">Autor</label>
                <input 
                    type="text" 
                    title="Autor"
                    id="autor" 
                    name="autor" 
                    class="form-control form-control-sm rounded w-50 border-secondary-subtle shadow-none fst-italic text-black-50" 
                    required
                    readonly						
                    placeholder="Autor"
                    tabindex="-1"
                >
            </div>
            <button 
                onmouseup="onsubmitNewIngredient()"
                id="btn-submit-recipe"
                class="btn btn-secondary btn-sm mt-2 mx-auto"
            >
                Agregar
            </button>
        </div>
    </form>	
`

export default formAddIngredientTemplate