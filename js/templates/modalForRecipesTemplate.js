const modalForRecipes = document.createElement('template')

modalForRecipes.innerHTML = `
    <div class="modal fade" data-bs-keyboard="false" data-bs-backdrop="static" id="recipe-modal" tabindex="-1" role="dialog" aria-labelledby="recipe-modal-label" aria-hidden="true" onkeyup="event.key==='Escape' && (window.location.href='/')">
        <div class="modal-dialog d-flex justify-content-center" role="document">
            <div class="modal-content vw-100 ">
                <div class="modal-header">
                    <h5 class="modal-title" id="recipe-modal-label">Elegir receta</h5>
                    <button type="button" class="btn btn-close" aria-label="Close" onclick="window.location.href='/'">
                    </button>
                </div>
                <div class="modal-body">
                    <table-recipes-list config="none/modify"></table-recipes-list>
                </div>
            </div>
        </div>
    </div>
`
export default modalForRecipes