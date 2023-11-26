const templateMenu = async () => {
    const menuTemplate = document.createElement('template')
    let userName = sessionStorage.getItem('user-name')
    !userName && (userName='Visitante')

    menuTemplate.innerHTML = `
        <nav class="menu-bar navbar navbar-expand-lg navbar-dark bg-dark ps-5">
            <a class="navbar-brand" href="./">Costos</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end pe-5" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active my-auto">
                        <a class="nav-link" href="./">Inicio </a>
                    </li>
                    <li class="nav-item dropdown my-auto">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Ingredientes
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown1">
                            <a class="dropdown-item" href="./agregarIngredientes.html">Agregar</a>
                            <a class="dropdown-item" href="./modificarIngredientes.html">Modificar</a>
                            <a class="dropdown-item" href="./eliminarIngredientes.html">Eliminar</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="./listaIngredientes.html">Ver lista completa</a>
                            <a class="dropdown-item" href="./chart.html">Ver gráfico de barras</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown my-auto">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Recetas
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown2">
                            <a class="dropdown-item" href="./agregarReceta.html" data-bs-toggle="modal">Agregar</a>
                            <a class="dropdown-item" href="./modificarReceta.html">Modificar</a>
                            <a class="dropdown-item" href="./eliminarRecetas.html">Eliminar</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="./listaRecetas.html">Ver lista completa</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown my-auto">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Usuario
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown3">
                            <small><p class="dropdown-item fst-italic">Hola ${userName}!</p></small>
                            <a class="dropdown-item" href="./login.html" data-bs-toggle="modal">Login</a>
                            <a class="dropdown-item" href="/" onmouseup="
                                                                        sessionStorage.removeItem('token');
                                                                        sessionStorage.removeItem('user-name');
                                                                        alert('Cerraste sesion exitosamente');
                                                                        "
                            >
                                Logout
                            </a>
                        </div>
                    </li>
                    <li class="nav-item my-auto">
                        <form 
                            class="form-inline d-flex flex-row gap-2 align-items-center "
                            onsubmit="return false"
                        >
                            <input 
                                id="search"
                                class="form-control form-control-sm mr-sm-2" 
                                type="search" 
                                placeholder="Search" 
                                aria-label="Search" 
                                style="height: 2rem"
                                onkeyup="event.key==='Enter' ? location.assign('../../search.html?inputTerms='  +  this.value + '&queryType=' + this.nextElementSibling.value) : null"
                            >
                            <select 
                                id="queryType" 
                                class="form-select form-select-sm" 
                                style="height: 2rem"
                            >
                                <option value="Ingredientes" selected>Ingredientes</option>
                                <option value="Recetas">Recetas</option>
                            </select>
                            <button 
                                class="btn btn-outline-success m-0 px-2" 
                                type="button"
                                onmouseup="location.assign('../../search.html?inputTerms='  +  this.previousElementSibling.previousElementSibling.value + '&queryType=' + this.previousElementSibling.value)"
                            >
                                Search
                            </button>
                        </form>
                    </li>
                </ul>
            </div>
        </nav>
    `
    return menuTemplate
}

export {templateMenu}