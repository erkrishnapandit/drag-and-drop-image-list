document.addEventListener("DOMContentLoaded", function () {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const addButton = document.getElementById("add-button");
  const cancelButton = document.getElementById("cancel-button")
  const previewContainer = document.getElementById("preview-container");
  const previewImage = document.getElementById("preview-image");
  const imageComment = document.getElementById("image-comment");
  const fileList = document.getElementById("fileList");
  const MAX_IMAGES = 5;
  let selectedFile = null;

  //Write the code of all the dropzone functionality here


  // When Someone click on the dropzone area then fileinput should be clicked.
  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    selectedFile = fileInput.files;
    displayFile(selectedFile);
  })


  // Preventing the default behaviour of drag and drop functionality.
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    selectedFile = e.dataTransfer.files;
    displayFile(selectedFile);
  })

  addButton.addEventListener("click", () => {
    if (selectedFile) {
      addImageToList(selectedFile);
    }
    clearPreview();
  });

  cancelButton.addEventListener("click", () => {
    clearPreview();
  })

  function clearPreview() {
    previewContainer.style.display = "none";
  }

  // Functionality to display file in preview section

  function displayFile(file) {

    if (fileList.childElementCount < MAX_IMAGES) {
      selectedFile = file[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewContainer.style.display = "block";
      }
      reader.readAsDataURL(selectedFile);
    } else {
      alert(`You Can't upload more than ${MAX_IMAGES} items`);
    }
  }

  // Functionality To Add image into the To-Do list
  function addImageToList(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const div = document.createElement("div");
      div.className = "file-name";

      const image = document.createElement("img");
      image.className = "thumbnail"
      image.src = e.target.result;
      image.alt = file.name;
      div.appendChild(image);

      const span = document.createElement("span");
      span.className = "comment-text";
      span.textContent = imageComment.value;
      div.appendChild(span);

      const deleteButton = document.createElement("button");
      deleteButton.className = "btn";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        div.remove();
      });
      div.appendChild(deleteButton);
      fileList.appendChild(div);
    };
    reader.readAsDataURL(file);
  }

  // functionality to save data in the local storage
  function saveInLocalStorage() {
    const imageData = [];
    fileList.querySelectorAll(".file-name").forEach((item) => {
      const image = item.querySelector("img");
      const span = item.querySelector("span");
    });
    imageData.push({src: img.src,comment: span.textContent});
    localStorage.setItem('ImageData', JSON.stringify(imageData));
  }


  //Function to load the data from localStorage
  function loadFromLocalStorage() {
    const storedImagesData = JSON.parse(
      localStorage.getItem("storedImagesData") || "[]"
    );
    console.log("Loaded from localStorage:", storedImagesData);
    storedImagesData.forEach((data) => {
      const div = document.createElement("div");
      div.className = "file-name";

      const img = document.createElement("img");
      img.src = data.src;
      img.className = "thumbnail";
      div.appendChild(img);

      // Write rest of the code here
    });
  }
});
