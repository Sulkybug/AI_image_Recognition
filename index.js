let net;
const image = document.getElementById("addImg");
const inputFile = document.getElementById("uploadImg");
const buttonURL = document.getElementById("uploadButton");
const linkInput = document.getElementById("link");
const clearButton = document.getElementById("clear");

inputFile.onchange = () => {
  image.src = URL.createObjectURL(inputFile.files[0]);
  resizeImg();
  clearDescription();
  app(image);
};

// adding Image with URL Link
buttonURL.addEventListener("click", () => {
  if (linkInput.value != "") {
    image.src = `${linkInput.value}`;
    resizeImg();
    clearDescription();
    app(image);
  } else {
    alert("please introduce a URL address");
  }
});

// cleaning input URL
clearButton.addEventListener("click", () => {
  linkInput.value = "";
});

// changing from smallIcon to Image
const resizeImg = () => {
  if (document.getElementById("addImg").classList.contains("smallIcon")) {
    document.getElementById("addImg").classList.remove("smallIcon");
    document.getElementById("addImg").classList.add("image");
  }
};

const clearDescription = () => {
  descriptionOne.textContent = "Loading...";
  descriptionTwo.textContent = "";
  descriptionThree.textContent = "";
};

image.addEventListener("click", () => {
  if (document.getElementById("addImg").classList.contains("smallIcon")) {
    inputFile.click();
  }
});

const descriptionOne = document.querySelector(".descriptionOne");
const descriptionTwo = document.querySelector(".descriptionTwo");
const descriptionThree = document.querySelector(".descriptionThree");

async function app(img) {
  try {
    descriptionTwo.textContent = "Loading mobilenet..";
    // Load the model.
    net = await mobilenet.load();
    descriptionThree.textContent = "Successfully loaded model";
    // Make a prediction through the model on our image.
    const result = await net.classify(img);
    descriptionOne.textContent = `${result[0].className} - Probability: ${(
      result[0].probability * 100
    ).toFixed(2)}%`;
    descriptionTwo.textContent = `${result[1].className} - Probability: ${(
      result[1].probability * 100
    ).toFixed(2)}%`;
    descriptionThree.textContent = `${result[2].className} - Probability: ${(
      result[2].probability * 100
    ).toFixed(2)}%`;
  } catch (error) {
    clearDescription();
    descriptionOne.textContent = error;
    descriptionTwo.textContent = "Not valid URL";
    document.getElementById("addImg").classList.remove("image");
    document.getElementById("addImg").classList.add("smallIcon");
    image.src = "img/error.png";
  }
}
