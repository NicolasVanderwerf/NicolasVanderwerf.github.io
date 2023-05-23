let pdfScale = 1; // default scale
let canvas = document.querySelector("#pdf-canvas");
let context = canvas.getContext('2d');

window['pdfjs-dist/build/pdf'].getDocument('skiHillAppWeb/skiHillMaps/ParkCitySkiHillMap.pdf').promise.then((pdfDoc_) => {
    pdfDoc = pdfDoc_;
    renderPage(1); // display first page
});

function renderPage(num) {
    pdfDoc.getPage(num).then((page) => {
        let viewport = page.getViewport({ scale: pdfScale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        let renderContext = {
            canvasContext: context,
            viewport: viewport,
        };
        page.render(renderContext);
    });
}

canvas.addEventListener('click', (event) => {
    let x = event.pageX - canvas.offsetLeft;
    let y = event.pageY - canvas.offsetTop;
    console.log(`PDF coordinates: (${x / pdfScale}, ${y / pdfScale})`);
});

