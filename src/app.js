// ##Consultar Tempo

document.getElementById('btnConsultar').addEventListener('click', () => {
    let uf = document.getElementById("selectUF").value || "";
    let cidade = document.getElementById("selectCidade").value || "";

    //parei aqui CONDICIONAL CONSULTA
    let url = "https://api.hgbrasil.com/weather?key=490dde93&city_name=" + cidade + "," + uf;
});


// ##Preencher Cidades

document.getElementById('selectUF').addEventListener('change', () => {
    let uf = document.getElementById('selectUF').value;
    let url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+ uf +"/municipios";
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', url);
    xmlHttp.onreadystatechange = () => {
        if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            let txtMunicipios = xmlHttp.responseText;
            let jsonMunicipios = JSON.parse(txtMunicipios);
            let municipiosSelect = document.getElementById('selectCidade');

            if(!municipiosSelect.options[1]) {
                preencherSelectComOptions(municipiosSelect,jsonMunicipios);
            }else {
                municipiosSelect.innerHTML = "";
                preencherSelectComOptions(municipiosSelect,jsonMunicipios);
            }
        }
    }
    xmlHttp.send();
});

// ##Preencher SelectComOptions

function preencherSelectComOptions(municipiosSelect,jsonMunicipios) {
    jsonMunicipios.forEach(municipio => {
        option = new Option(municipio.nome, municipio.nome.toLowerCase());
        municipiosSelect.options[municipiosSelect.options.length] = option;
    });
}