//document.addEventListener('DOMContentLoaded', function() {
  //Funcoes para professores
function renderProfessores(){
    const tbody = document.querySelector('#professoresTable tbody');
    tbody.innerHTML = '';
    fetch('http://localhost:3000/professores')
    .then(response => response.json())
    .then(professores => {
      //faça algo com os dados recebidos
      console.log(professores)

      professores.forEach((professor, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${professor.codigo}</td>
          <td>${professor.nomeProfessor}</td>
          <td>${professor.emailProfessor}</td>
          <td>
            <button onclick="editProfessor(${index})">Editar</button>
            <button onclick="deleteProfessor(${index})">Excluir</button>
          </td>
`;
tbody.appendChild(row);

        
        


      })


    })
  }

//})




let professores = [];
let currentProfessorId = null;
console.log("Script carregado");
// Altera a propriedade display para block, exibindo a modal que estava none
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
  }
  
  // Altera a propriedade display para none, ocultando a modal
  function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
  }

  const btnAddProfessor = document.getElementById('addProfessores');
  btnAddProfessor.addEventListener('click', function(){
    currentProfessorId = null;
    document.getElementById('professorForm').reset();
    openModal('professorModal');
    
  });

  
  // Listener para fechar modais
  document.querySelectorAll('.close').forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function() {
      closeModal('professorModal');
    });
  }); 
function addProfessor(codigo, nomeProfessor, emailProfessor){
  let professor = {codigo, nomeProfessor, emailProfessor}
  console.log(professor)
    fetch('http://localhost:3000/professores',
      {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(professor)
      })
      .then(response.json())
      .then(dados => {
        console.log(dados)
      })

  renderProfessores();
}

//carrega os cursos como linhas da tabela


  function editProfessor(index){
    const professor=professores[index];
    document.getElementById('codigo').value= professor.codigo;
    document.getElementById('nomeProfessor').value = professor.nomeProfessor;
    document.getElementById('emailProfessor').value = professor.emailProfessor;
    currentProfessorId = index;
    openModal('professorModal');
 }
  
  function deleteProfessor(index){
    if(confirm("Tem certeza que deseja excluir este professor")){
    professores.splice(index, 1);
    currentProfessorId = index;
    renderProfessores();
  }}
  
  

  const  professorForm = document.getElementById('professorForm');
  professorForm.addEventListener('submit' , function(e){
    e.preventDefault();
    const codigo = document.getElementById('codigo').value;
    const nomeProfessor = document.getElementById('nomeProfessor').value;
    const emailProfessor = document.getElementById('emailProfessor').value;
    //inclusão ou alteração
   if (currentProfessorId !== null){
    professores[currentProfessorId] = {codigo, nomeProfessor, emailProfessor}
    }else {
      addProfessor(codigo,nomeProfessor,emailProfessor);
        
    }
    closeModal('professorModal');
    renderProfessores();
  });


  renderProfessores();