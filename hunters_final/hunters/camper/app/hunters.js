const URL_API = 'data/campers.json';
const btnLoadData = document.querySelector('#cargarData');
btnLoadData.addEventListener('click', LoadData);
function LoadData() {
	fetch(URL_API)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			viewData(data);
		})
		.catch((err) => {
			console.log(err);
		});
}

function showTribuData(e) {
	const idTribu = e.target.dataset.tribu;
	const campers = JSON.parse(e.target.dataset.campers);
	const divContenedor = document.querySelector('#contenedorTribuData');
	function renderHTML(camper) {
		const { id, nombre, edad, ingles } = camper;
		return `
		<div class="card" style="width: 18rem;">

  <div class="card-body">
    <h5 class="card-title">TRIBU</h5>
    <p class="card-text"><p>Id : ${id}</p>
	<p>Nombre : ${nombre}</p>
	<p>Edad : ${edad}</p>
	<p>Nivel de ingles : ${ingles}</p></p>
 
  </div>
</div> 
	        `
			
	}
	divContenedor.innerHTML = campers.map(renderHTML).join('');
	document.querySelector(
		`.btnShowTribuData[data-tribu="${idTribu}"]`,
	).style.display = 'none';
	document.querySelector(
		`.btnHideTribuData[data-tribu="${idTribu}"]`,
	).style.display = 'block';
}

function hideTribuData(e) {
	const idTribu = e.target.dataset.tribu;
	const divContenedor = document.querySelector('#contenedorTribuData');
	divContenedor.innerHTML = '';
	document.querySelector(
		`.btnShowTribuData[data-tribu="${idTribu}"]`,
	).style.display = 'block';
	document.querySelector(
		`.btnHideTribuData[data-tribu="${idTribu}"]`,
	).style.display = 'none';
}

function viewData(myData) {
	const divContenedor = document.querySelector('#contenedor');
	function renderHTML(data) {
		const { idTribu, tribu, puntos, campers } = data;
		return `
            <p>Id : ${idTribu}</p>
            <p>Tribu : ${tribu}</p>
            <p>puntos : ${puntos}</p>
            <button class="btnShowTribuData" data-tribu='${idTribu}' data-campers='${JSON.stringify(
			campers,
		)}'>Mostrar Datos</button>
            <button class="btnHideTribuData" data-tribu='${idTribu}' style="display: none;">Ocultar Datos</button>
            <div id='contenedorTribuData'></div>
            `;
	}
	divContenedor.innerHTML = myData.map(renderHTML).join('');
	const btnShowTribuData = document.querySelector('.btnShowTribuData');
	btnShowTribuData.addEventListener('click', showTribuData);
	const btnHideTribuData = document.querySelector('.btnHideTribuData');
	btnHideTribuData.addEventListener('click', hideTribuData);
}
