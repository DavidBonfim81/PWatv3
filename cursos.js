//array dos cursos
let cursos = [];
let novoCodigo = null;

//let curso = null
//variavel para o id atual
let currentCursoId = null;

// Altera a propriedade display para block, exibindo a modal que estava none
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
}

// Altera a propriedade display para none, ocultando a modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
}

// Listener para o botão addCurso, vai chamar a openModal()
const btAddCurso = document.getElementById('addCurso');
btAddCurso.addEventListener('click', function() {
  novoCodigo = cursos.length > 0
  ? Math.max(...cursos.map(c => parseInt(c.codigo))) + 1
  : 1;
    document.getElementById('cursoForm').reset();
    document.getElementById('codigo').value = novoCodigo;
    openModal('cursoModal');
  }); 
 
 
  // Listener para fechar modais
  document.querySelectorAll('.close').forEach(function(closeBtn) {
    closeBtn.addEventListener('click', function() {
      closeModal('cursoModal');
    });
  }); 


//carrega os cursos como linhas da tabela
function renderCursos() {
  const tbody = document.querySelector('#cursosTable tbody');
  tbody.innerHTML = '';
  fetch('http://localhost:3000/cursos')
    .then(response => response.json())
    .then(dados => {
      cursos = dados;
      //faça algo com os dados recebidos
      console.log(cursos)
    //       <!-- <td style="display:none">${curso.codigo}</td> -->

  cursos.forEach((curso, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td style="display:none">${curso.codigo}</td>
      <td>${curso.nomeCurso}</td>
      <td>${curso.sigla}</td>
      <td>${curso.descricao}</td>
      <td>${curso.coordenador}</td>
      <td>
        <button onclick="editCurso(${index})">Editar</button>
        <button onclick="deleteCurso(${index})">Excluir</button>
      </td>
      ` ;
    tbody.appendChild(row);
  });})
}
function editCurso(index) {
  const curso = cursos[index];
  //document.getElementById('cursoId').value = curso.id; // <-- Aqui
  document.getElementById('cursoForm').reset();

  document.getElementById('codigo').value = curso.codigo;
  document.getElementById('nomeCurso').value = curso.nomeCurso;
  document.getElementById('sigla').value = curso.sigla;
  document.getElementById('descricao').value = curso.descricao;
  document.getElementById('coordenador').value = curso.coordenador;

  openModal('cursoModal');
}



function deleteCurso(index) {

  if (confirm("Tem certeza que deseja excluir este curso?")) {
    const curso = cursos[index];
    const id = curso.id;
    console.log(`Enviando requisição DELETE para /cursos/${id}`);
    fetch(`http://localhost:3000/cursos/${id}`, {
      method: 'DELETE'
    })
    .then(response => {
      console.log('Status da resposta:', response.status);
      return response.json();
    })
    .then(dados => {
      console.log(dados);
      renderCursos();
      // Atualize a interface do usuário aqui, se necessário
    })

  }
}


function addCurso(curso) {
  fetch('http://localhost:3000/cursos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(curso)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Curso adicionado:', data);
    renderCursos();
  });
}
/* 

 function addCurso(codigo, nomeCurso, sigla, descricao, coordenador){
  cursos.push({codigo , nomeCurso, sigla, descricao, coordenador});
  console.log(cursos)
    fetch('http://localhost:3000/cursos',
      {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(cursos)
      })
      .then(response.json())
      .then(dados => {
        console.log(dados)
      })

  renderCursos();
}  */


/* cursoForm.addEventListener('submit', function(e) {
  e.preventDefault();
 // const id = document.getElementById('cursoId').value;
  const codigo = document.getElementById('codigo').value;
  const nomeCurso = document.getElementById('nomeCurso').value;
  const sigla = document.getElementById('sigla').value;
  const descricao = document.getElementById('descricao').value;
  const coordenador = document.getElementById('coordenador').value;
  const curso = { codigo, nomeCurso, sigla, descricao, coordenador };
  console.log(curso.codigo)


  fetch(`http://localhost:3000/cursos/${curso.codigo}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(curso)
  }) 

    .then(response => response.json())

    .then(data => {
    console.log('chegou aqui', data)

    //console.log('Curso atualizado:', data);
    renderCursos();
  });
});
 */

cursoForm.addEventListener('submit', function(e) {
  e.preventDefault();

  let codigo = document.getElementById('codigo').value;
  const nomeCurso = document.getElementById('nomeCurso').value;
  const sigla = document.getElementById('sigla').value;
  const descricao = document.getElementById('descricao').value;
  const coordenador = document.getElementById('coordenador').value;

  const curso = { codigo, nomeCurso, sigla, descricao, coordenador };

  const cursoExistente = cursos.find(c => String(c.codigo) === String(codigo));

  if (cursoExistente) {
    // PUT
    fetch(`http://localhost:3000/cursos/${codigo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(curso)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Curso atualizado:', data);
      closeModal('cursoModal');
      renderCursos();
    });
  } else {
    // POST com novoCodigo
    curso.codigo = novoCodigo;
    fetch('http://localhost:3000/cursos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(curso)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Curso adicionado:', data);
      closeModal('cursoModal');
      renderCursos();
    });
  }
});
renderCursos();
