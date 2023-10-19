const menuTemplate = document.createElement('template')

menuTemplate.innerHTML = `
    <nav class="menu-bar navbar navbar-expand-lg navbar-dark bg-dark ps-5">
        <a class="navbar-brand" href="./">Costos</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end pe-5" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="./">Inicio </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Ingredientes
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="./agregarIngredientes.html">Agregar</a>
                        <a class="dropdown-item" href="./modificarIngredientes.html">Modificar</a>
                        <a class="dropdown-item" href="./eliminarIngredientes.html">Eliminar</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="./listaIngredientes.html">Ver lista completa</a>
                    </div>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Recetas
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item" href="./agregarReceta.html" data-bs-toggle="modal">Agregar</a>
                        <a class="dropdown-item" href="./modificarReceta.html">Modificar</a>
                        <a class="dropdown-item" href="./eliminarRecetas.html">Eliminar</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="./listaRecetas.html">Ver lista completa</a>
                    </div>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0 d-flex gap-2 align-items-center ">
                <input class="form-control h-75 mr-sm-2" type="search" id="input-search" placeholder="Buscar" aria-label="Search">
                <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
            </form>
        </div>
    </nav>
`
export default menuTemplate