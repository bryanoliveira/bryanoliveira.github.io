<script>
    export let image = '';
    export let description = '';
    export let closeModal;
  
    function handleCloseModal() {
      closeModal();
    }
  </script>
  
  <div class="modal" on:click="{handleCloseModal}">
    <div class="modal-content" on:click="{e => e.stopPropagation()}">
      <img src="{image}" alt="{description}" />
      <p>{description}</p>
      <button on:click="{handleCloseModal}">Close</button>
    </div>
  </div>
  
  <style>
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
    }
  
    .modal-content {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
  
    .modal-content img {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
    }
  </style>
  