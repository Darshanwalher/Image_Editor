let filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayScale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
}

const imageCanvas = document.querySelector('#image-canvas')
const imageInput = document.querySelector('#image-input')
const canvasCtx = imageCanvas.getContext('2d')
const resetBtn = document.querySelector('#rest-btn')
const downloadbtn = document.querySelector('#download-btn')
const presetContainer = document.querySelector('.presets')
let file = null;
let image = null

const filtersContainer = document.querySelector('.filters')

function createFilterElement(name,unit="%",value,min,max){
    const div = document.createElement("div");
    div.classList.add('filter');

    const input = document.createElement("input")
    input.type='range'
    input.min=min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement('p')
    p.innerText=name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input",(dets)=>{
        filters[name].value = input.value
        applyFilter()
        
    })

    return div
}

function createFilter(){
    Object.keys(filters).forEach(key=>{
    const filterElem = createFilterElement(key,filters[key].unit,filters[key].value,filters[key].min,filters[key].max)
    filtersContainer.appendChild(filterElem)
})
}

createFilter()

imageInput.addEventListener('change',(event)=>{
    file = event.target.files[0]
    const imagePlaceHolder = document.querySelector('.placeholder')
    imageCanvas.style.display = 'block'
    imagePlaceHolder.style.display = 'none'

    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = ()=>{
        image = img
        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img,0,0)
    }
    
    
})

function applyFilter(){
    const filterString = `
        brightness(${filters.brightness.value}${filters.brightness.unit})
        contrast(${filters.contrast.value}${filters.contrast.unit})
        saturate(${filters.saturation.value}${filters.saturation.unit})
        hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
        blur(${filters.blur.value}${filters.blur.unit})
        grayscale(${filters.grayScale.value}${filters.grayScale.unit})
        sepia(${filters.sepia.value}${filters.sepia.unit})
        opacity(${filters.opacity.value}${filters.opacity.unit})
        invert(${filters.invert.value}${filters.invert.unit})
    `;

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    canvasCtx.filter = filterString;
    canvasCtx.drawImage(image, 0, 0);
}

resetBtn.addEventListener('click',()=>{
    filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    exposure:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    grayScale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },
    invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    }
    applyFilter()

    filtersContainer.innerHTML=""
    createFilter()
})

downloadbtn.addEventListener('click', () => {
    const fileName = prompt("Enter file name:", "edited-image");

    if (!fileName) return; // user cancelled

    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = imageCanvas.toDataURL("image/png");
    link.click();
});

const presets = {
  Normal: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  Dramatic: {
    brightness: 95,
    contrast: 140,
    saturation: 130,
    hueRotation: 0,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  Vintage: {
    brightness: 110,
    contrast: 90,
    saturation: 80,
    hueRotation: 15,
    blur: 1,
    grayScale: 10,
    sepia: 40,
    opacity: 100,
    invert: 0
  },

  OldSchool: {
    brightness: 105,
    contrast: 85,
    saturation: 70,
    hueRotation: 20,
    blur: 1,
    grayScale: 30,
    sepia: 60,
    opacity: 100,
    invert: 0
  },

  Cinematic: {
    brightness: 90,
    contrast: 130,
    saturation: 120,
    hueRotation: -10,
    blur: 0,
    grayScale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0
  },

  Faded: {
    brightness: 115,
    contrast: 80,
    saturation: 75,
    hueRotation: 0,
    blur: 0,
    grayScale: 10,
    sepia: 20,
    opacity: 100,
    invert: 0
  },

  BlackAndWhite: {
    brightness: 100,
    contrast: 120,
    saturation: 0,
    hueRotation: 0,
    blur: 0,
    grayScale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  Warm: {
    brightness: 110,
    contrast: 105,
    saturation: 120,
    hueRotation: 10,
    blur: 0,
    grayScale: 0,
    sepia: 15,
    opacity: 100,
    invert: 0
  },

  Cool: {
    brightness: 100,
    contrast: 110,
    saturation: 110,
    hueRotation: -15,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  Neon: {
    brightness: 110,
    contrast: 150,
    saturation: 180,
    hueRotation: 25,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  Dreamy: {
    brightness: 115,
    contrast: 85,
    saturation: 110,
    hueRotation: 5,
    blur: 2,
    grayScale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0
  },

  Horror: {
    brightness: 70,
    contrast: 160,
    saturation: 60,
    hueRotation: -30,
    blur: 0,
    grayScale: 20,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  Inverted: {
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 100
  }
};


Object.keys(presets).forEach(presetName=>{
    let presetButton = document.createElement('button')
    presetButton.classList.add('btn')
    presetButton.innerText = presetName
    presetContainer.appendChild(presetButton)

    presetButton.addEventListener('click',()=>{
        const preset = presets[presetName]

        Object.keys(preset).forEach(filterName=>{
            filters[filterName].value = preset[filterName]
        })

        applyFilter()
    })

})




