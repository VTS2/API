const url = 'https://restcountries.com/v2/all'

// const listaPaises = document.querySelector('#paises')

const listaPaises = $('#paises') //declarando variavrl em jquery

const cardsPorPagina = 12

let paginaAtual = 1

fetch(url)

    .then(Response => Response.json())

    .then(data => {

        // o metodo math.ceil() irá arredondar o resutado de divisão pra cima
        let totalPaginas = Math.ceil(data.length / cardsPorPagina)

        function mostarPagina(pagina) {

            let incio = (pagina - 1) * cardsPorPagina
            let fim = incio + cardsPorPagina

            listaPaises.empty()

            for (let i = incio; i < fim && i < data.length; i++) {
                let pais = data[i]
                let tr = document.createElement('tr')
                tr.innerHTML = `
            <div class="cente">
            <div class="container">
            <div class="card" style="width: 19rem;">
            <h3>Bandeira</h5>
            <p><img src="${pais.flag}" width="300"></img></p>
            <div class="card-body">
            <h3>Nome</h3>
            <p class="pais">${pais.name}</p>
            <h3>Populção</h3>
            <p>${pais.population}</p>
            <h3>Capital</h3>
            <p>${pais.capital}</p>
            <h3>Região</h3>
            <p>${pais.region}</p>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${[i]}">
             Ver mais 
            </button>

            <!-- Modal -->
            <div class="modal fade" id="exampleModal${[i]}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Mais sobre o País</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
             </div>
            <div class="modal-body">
            <h3>Subregião</h3>
            <p class="pais">${pais.subregion}</p>
            <h3>Area do País</h3>
            <p>${pais.area}</p>
            <h3>Zona de Tempo</h3>
            <p>${pais.timezones}</p>
            <h3>Nome Nativo</h3>
            <p>${pais.nativeName}</p>
            </div>
            <div class="modal-footer">
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            `
                listaPaises.append(tr)
            }
        }

        function atualizarPagina() {
            $("#contador-pagina").text(`Pagina ${paginaAtual} de ${totalPaginas}`)
            $("anterior").prop('disabled', paginaAtual === 1)
            $("proximo").prop('disabled', paginaAtual === totalPaginas)
            mostarPagina(paginaAtual)
        }

        atualizarPagina()

        $("#anterior").click(() => {
            if (paginaAtual > 1) {
                paginaAtual--
                atualizarPagina()
            }
        })

        $("#proximo").click(() => {
            if (paginaAtual < totalPaginas) {
                paginaAtual++
                atualizarPagina()
            }
        })

    })

    .catch(error => console.error(error))