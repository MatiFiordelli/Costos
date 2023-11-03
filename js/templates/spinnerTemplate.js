const templateSpinner = () => {
    const spinner = document.createElement('template')

    spinner.innerHTML = `
    <div id="spinner" class="vh-100 d-grid justify-content-center align-items-center">
        <div class="spinner-border" role="status">
            <span class="sr-only"></span>
        </div>
    </div>
    `

    return spinner
}

export default templateSpinner