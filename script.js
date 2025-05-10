document.addEventListener("DOMContentLoaded", (e) => {
    const sobre = document.querySelector("footer")
    fetch('sobre.json')
    .then(response => response.json())
    .then(dados => {
        console.log(dados)
        sobre.innerHTML = `
            <p>Desenvolvido por ${dados.autor}, em ${dados.data}.</p>
            <p>Contatos: ${dados.contatos[0]}</p>
        `
    })
})
