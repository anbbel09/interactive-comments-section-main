
let com;
const user = document.getElementById('user');
const commentContainer = document.getElementById('commentContainer');
const comentarioId = Date.now();


fetch('data.json')
  .then(res => res.json())
  .then(data => {
    comments = data;
    currentUser = data;

    for (let comentario of comments.comments) {
      commentContainer.innerHTML += `
        <article data-id="${comentarioId}" class="bg-white rounded-lg p-2 flex flex-col">
          <div id="user" class="flex gap-5 items-center">
            <img class="max-w-3xs" src="${comentario.user.image.webp}" alt="">
            <h2 class="font-medium">${comentario.user.username}</h2>
            <h3 class="font-light text-gray-500">${comentario.createdAt}</h3>
          </div>
          <p class="font-normal text-gray-500 my-3">${comentario.content}</p>
          <div class="flex justify-between">
            <button class="flex items-center justify-evenly w-1/3 md:max-w-1/5 bg-indigo-50 p-1 rounded-md md:my-2">
              <img class="w-4 cursor-pointer" src="images/icon-plus.svg" alt="">
              <span class="font-bold text-indigo-800">0</span>
              <img class="w-4 h-1 cursor-pointer" src="images/icon-minus.svg" alt="">
            </button>
            <button class="flex items-center gap-2 font-bold text-indigo-800 cursor-pointer btnReply">
              <img class="w-4 h-4" src="images/icon-reply.svg" alt="">Reply
            </button>
          </div>
          <div class="replyCont w-full mx-auto my-3 p-2 border-l border-gray-400 hidden"> 
          </div>
        </article>
        `;
    }

    const current = currentUser.currentUser;

   
    commentContainer.innerHTML += `
      <form id="formComment" class="bg-white rounded-lg p-2 w-full md:mt-auto formComment" action="">
        <textarea class="border-1 border-gray-400 w-full h-28 rounded-lg p-2" placeholder="Add a comment..."></textarea>
        <div class="flex justify-between items-center mt-3">
          <img class="max-w-3xs" src="${current.image.webp}" alt="">
          <button class="bg-indigo-800 w-1/3  py-2 md:max-w-1/6 md:py-4 rounded-lg font-semibold text-white text-lg " type="submit">SEND</button>
        </div>
      </form>
     
      `;


    const form = document.querySelector('form');
    const textarea = form.querySelector('textarea');
    let formComment = document.getElementById('formComment');

    form.addEventListener('submit', function (e) {
      e.preventDefault(); 

      const mensaje = textarea.value.trim();
      if (mensaje === "") return;

      const nuevoComentario = `
        <article data-id="${comentarioId}" class="bg-white rounded-lg p-2 my-3 comment">
          <div class="flex gap-5 items-center">
            <img class="max-w-3xs" src="${current.image.webp}" alt="">
            <h2 class="font-medium">${current.username}</h2>
            <p class="text-white bg-indigo-600 py-1 px-3 rounded-md font-semibold text-xs">you</p>
            <h3 class="font-light text-gray-500">Just now</h3>
          </div>
          <p class="font-normal text-gray-500 my-3">${mensaje}</p>
          <div class="flex justify-between ">
            <button class="flex items-center justify-evenly w-1/3 md:max-w-1/5 bg-indigo-50 p-1 rounded-md md:my-2">
              <img class="w-4 cursor-pointer" src="images/icon-plus.svg" alt="">
              <span class="font-bold text-indigo-800">0</span>
              <img class="w-4 h-1 cursor-pointer" src="images/icon-minus.svg" alt="">
            </button>
            <div class="customContainer flex w-full justify-end md:justify-items-end gap-3  ">
    <button class="deleteBtn flex flex-row items-center gap-2 font-semibold text-red-700 md:ml-auto md:mr-4 md:text-lg"> 
      <img class="w-4 h-4 md:w-6 md:h-6" src="images/icon-delete.svg" alt=""> Delete
    </button>
    <button class="editBtn flex flex-row items-center gap-2 font-semibold text-indigo-600 md:text-lg"> 
      <img class="w-4 h-4 md:w-6 md:h-6" src="images/icon-edit.svg" alt="">Edit
    </button>
  </div>
          </div>
        </article>
      `;

      formComment.insertAdjacentHTML('beforebegin', nuevoComentario);
      textarea.value = "";

    const comentario = document.querySelector(`[data-id="${comentarioId}"]`);
        
    const modal = document.getElementById('modalContainer');


comentario.querySelector('.customContainer').addEventListener('click', (e) => {
  const target = e.target;

  if (target.closest('.deleteBtn')) {
    modal.style.display = 'block';

    
    const handleModalClick = (e) => {
      if (e.target.id === 'no') {
        modal.style.display = 'none';
      } else if (e.target.id === 'yes') {
        comentario.remove();
        modal.style.display = 'none';
      }


      modal.removeEventListener('click', handleModalClick);
    };

    modal.addEventListener('click', handleModalClick);
    
  } else if (target.closest('.editBtn')){

const  editBtn = document.querySelector('.editBtn');
const customContainer = comentario.querySelector('.customContainer');
const actionButtons = customContainer.querySelectorAll('.editBtn, .deleteBtn');
    
  const commentText = comentario.querySelector('p.font-normal'); // el texto del comentario
  const originalText = commentText.textContent;

  // Crear textarea con el texto actual
  const textareaEdit = document.createElement('textarea');
  textareaEdit.classList.add('border', 'w-full', 'rounded', 'p-2', 'my-2');
  textareaEdit.value = originalText;

  // Botón de guardar
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.classList.add('bg-indigo-600', 'text-white', 'px-3', 'py-1', 'rounded');


  // Reemplazamos el texto por el textarea
  commentText.replaceWith(textareaEdit);
  target.closest('.customContainer').appendChild(saveBtn);

  if(editBtn){
 
    actionButtons.forEach(btn => btn.style.display = 'none');
  }

  // Guardar cambios
  saveBtn.addEventListener('click', () => {
    const nuevoTexto = textareaEdit.value.trim();
    const nuevoParrafo = document.createElement('p');
    nuevoParrafo.className = 'font-normal text-gray-500 ';
    nuevoParrafo.textContent = nuevoTexto || originalText;

    textareaEdit.replaceWith(nuevoParrafo);
    saveBtn.remove();

    actionButtons.forEach(btn => btn.style.display = 'flex');
  });


}

});

      
    });

    commentContainer.addEventListener('click', (e) => {
      let element = e.target;
    
      // Detecta si se hizo clic dentro de un botón .btnReply
      const btnReply = element.closest('.btnReply');
    
      // Detecta el contenedor del comentario (con atributo data-id)
      const btnReplyContainer = element.closest('[data-id]');
    
      // ✅ Control limpio: solo actúa si se clickeó en un botón de respuesta válido dentro de un comentario válido
      if (btnReply && btnReplyContainer) {
        
        const replyCont = btnReplyContainer.querySelector('.replyCont');
    
        // Evita duplicar el formulario si ya hay uno dentro
        if (!replyCont.querySelector('.formComment')) {
          replyCont.innerHTML = `
            <form id="formComment" class="bg-white rounded-lg formComment">
              <textarea class="border-1 border-gray-400 w-full h-20 rounded-lg p-2" placeholder="Add a comment..."></textarea>
              <div class="flex justify-between items-end mt-3">
                <img class="" src="${current.image.webp}" alt="">
                <button class="bg-indigo-800 w-1/3 py-3 md:max-w-1/6 md:py-4 rounded-lg font-semibold text-white text-sm" type="submit">SEND</button>
              </div>
            </form>
          `;
    
          replyCont.style.display = 'block';
    
          // Enfoca el textarea automáticamente
          const textarea = replyCont.querySelector('textarea');
          textarea.focus();
        }

        let form = replyCont.querySelector('#formComment');

        form.addEventListener('submit', function (e) {
  e.preventDefault();

  const textarea = form.querySelector('textarea'); // ✅ buscamos el textarea desde el form
  const mensaje = textarea.value.trim();
  if (mensaje === "") return;

  const comentarioId = Date.now(); // O alguna lógica para el ID único
  const nuevoComentario = `
    <article data-id="${comentarioId}" class="bg-white rounded-lg p-2 my-3 comment">
      <div class="flex gap-5 items-center">
        <img class="max-w-3xs" src="${current.image.webp}" alt="">
        <h2 class="font-medium">${current.username}</h2>
        <p class="text-white bg-indigo-600 py-1 px-3 rounded-md font-semibold text-xs">you</p>
        <h3 class="font-light text-gray-500">Just now</h3>
      </div>
      <p class="font-normal text-gray-500 my-3">${mensaje}</p>
      <div class="flex justify-between">
        <button class="flex items-center justify-evenly w-1/3 md:max-w-1/5 bg-indigo-50 p-1 rounded-md md:my-2">
          <img class="w-4 cursor-pointer" src="images/icon-plus.svg" alt="">
          <span class="font-bold text-indigo-800">0</span>
          <img class="w-4 h-1 cursor-pointer" src="images/icon-minus.svg" alt="">
        </button>
        <div class="customContainer flex w-full justify-end md:justify-items-end gap-3">
          <button class="deleteBtn flex flex-row items-center gap-2 font-semibold text-red-700 md:ml-auto md:mr-4 md:text-lg"> 
            <img class="w-4 h-4 md:w-6 md:h-6" src="images/icon-delete.svg" alt=""> Delete
          </button>
          <button class="editBtn flex flex-row items-center gap-2 font-semibold text-indigo-600 md:text-lg"> 
            <img class="w-4 h-4 md:w-6 md:h-6" src="images/icon-edit.svg" alt="">Edit
          </button>
        </div>
      </div>
    </article>
  `;

  // ✅ Insertamos el comentario antes del formulario
  form.insertAdjacentHTML('beforebegin', nuevoComentario);
  textarea.value = "";

  // Ahora seleccionamos el nuevo comentario para agregarle los listeners
  const comentario = form.previousElementSibling;

  const modal = document.getElementById('modalContainer');

  comentario.querySelector('.customContainer').addEventListener('click', (e) => {
    const target = e.target;

    if (target.closest('.deleteBtn')) {
      modal.style.display = 'block';

      const handleModalClick = (e) => {
        if (e.target.id === 'no') {
          modal.style.display = 'none';
        } else if (e.target.id === 'yes') {
          comentario.remove();
          modal.style.display = 'none';
        }

        modal.removeEventListener('click', handleModalClick);
      };

      modal.addEventListener('click', handleModalClick);

    } else if (target.closest('.editBtn')) {
      const editBtn = comentario.querySelector('.editBtn');
      const customContainer = comentario.querySelector('.customContainer');
      const actionButtons = customContainer.querySelectorAll('.editBtn, .deleteBtn');
      const commentText = comentario.querySelector('p.font-normal');
      const originalText = commentText.textContent;

      const textareaEdit = document.createElement('textarea');
      textareaEdit.classList.add('border', 'w-full', 'rounded', 'p-2', 'my-2');
      textareaEdit.value = originalText;

      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Save';
      saveBtn.classList.add('bg-indigo-600', 'text-white', 'px-3', 'py-1', 'rounded');

      commentText.replaceWith(textareaEdit);
      customContainer.appendChild(saveBtn);

      if (editBtn) {
        actionButtons.forEach(btn => btn.style.display = 'none');
      }

      saveBtn.addEventListener('click', () => {
        const nuevoTexto = textareaEdit.value.trim();
        const nuevoParrafo = document.createElement('p');
        nuevoParrafo.className = 'font-normal text-gray-500';
        nuevoParrafo.textContent = nuevoTexto || originalText;

        textareaEdit.replaceWith(nuevoParrafo);
        saveBtn.remove();

        actionButtons.forEach(btn => btn.style.display = 'flex');
      });
    }
  });
});

      }
    });
      
    
  });

 

  


  
