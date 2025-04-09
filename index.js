
let com;
const user = document.getElementById('user');
const commentContainer = document.getElementById('commentContainer');

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    comments = data;
    currentUser = data;

    for (let comentario of comments.comments) {
      commentContainer.innerHTML += `
        <article class="bg-white rounded-lg p-2">
          <div id="user" class="flex gap-5 items-center">
            <img class="w-1/6" src="${comentario.user.image.webp}" alt="">
            <h2 class="font-medium">${comentario.user.username}</h2>
            <h3 class="font-light text-gray-500">${comentario.createdAt}</h3>
          </div>
          <p class="font-normal text-gray-500 my-3">${comentario.content}</p>
          <div class="flex justify-between">
            <button class="flex items-center justify-evenly w-1/3 bg-indigo-50 p-1 rounded-md">
              <img class="w-4 cursor-pointer" src="images/icon-plus.svg" alt="">
              <span class="font-bold text-indigo-800">0</span>
              <img class="w-4 h-1 cursor-pointer" src="images/icon-minus.svg" alt="">
            </button>
            <button class="flex items-center gap-2 font-bold text-indigo-800 cursor-pointer">
              <img class="w-4 h-4" src="images/icon-reply.svg" alt="">Reply
            </button>
          </div>
        </article>
        `;
    }

    const current = currentUser.currentUser;

   
    commentContainer.innerHTML += `
      <form id="formComment" class="bg-white rounded-lg p-2 w-full h-full" action="">
        <textarea class="border-1 border-gray-400 w-full h-28 rounded-lg p-2" placeholder="Add a comment..."></textarea>
        <div class="flex justify-between mt-3">
          <img class="w-1/6" src="${current.image.webp}" alt="">
          <button class="bg-indigo-800 w-1/3 rounded-lg font-semibold text-white text-lg h-auto" type="submit">SEND</button>
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

      const comentarioId = Date.now();

      const nuevoComentario = `
        <article data-id="${comentarioId}" class="bg-white rounded-lg p-2 my-3 comment">
          <div class="flex gap-5 items-center">
            <img class="w-1/6" src="${current.image.webp}" alt="">
            <h2 class="font-medium">${current.username}</h2>
            <p class="text-white bg-indigo-600 py-1 px-3 rounded-md font-semibold text-xs">you</p>
            <h3 class="font-light text-gray-500">Just now</h3>
          </div>
          <p class="font-normal text-gray-500 my-3">${mensaje}</p>
          <div class="flex justify-between">
            <button class="flex items-center justify-evenly w-1/3 bg-indigo-50 p-1 rounded-md">
              <img class="w-4 cursor-pointer" src="images/icon-plus.svg" alt="">
              <span class="font-bold text-indigo-800">0</span>
              <img class="w-4 h-1 cursor-pointer" src="images/icon-minus.svg" alt="">
            </button>
            <div class="customContainer flex w-1/2 justify-between gap-3">
    <button class="deleteBtn flex items-center gap-2 font-semibold text-red-700"> 
      <img class="w-4 h-4" src="images/icon-delete.svg" alt=""> Delete
    </button>
    <button class="editBtn flex items-center gap-2 font-semibold text-indigo-600"> 
      <img class="w-4 h-4" src="images/icon-edit.svg" alt="">Edit
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

    editBtn = document.querySelector('.editBtn')
    
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

  if(editBtn){
    const customContainer = comentario.querySelector('.customContainer');
 const actionButtons = customContainer.querySelectorAll('.editBtn, .deleteBtn');
 actionButtons.forEach(btn => btn.style.display = 'none');
   } 

  // Reemplazamos el texto por el textarea
  commentText.replaceWith(textareaEdit);
  target.closest('.customContainer').appendChild(saveBtn);

  // Guardar cambios
  saveBtn.addEventListener('click', () => {
    const nuevoTexto = textareaEdit.value.trim();
    const nuevoParrafo = document.createElement('p');
    nuevoParrafo.className = 'font-normal text-gray-500 ';
    nuevoParrafo.textContent = nuevoTexto || originalText;

    textareaEdit.replaceWith(nuevoParrafo);
    saveBtn.remove();

    const customContainer = comentario.querySelector('.customContainer');
    const actionButtons = customContainer.querySelectorAll('.editBtn, .deleteBtn');
    actionButtons.forEach(btn => btn.style.display = 'block');
  });


}

});

      
    });
  });

 

  


  
