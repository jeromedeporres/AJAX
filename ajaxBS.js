window.addEventListener('load', getCounry());

function getCounry() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://restcountries.eu/rest/v2/all", true);
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            //console.log(xhr.responseText);
            let oData = JSON.parse(xhr.responseText);
            console.log(oData[2].name)
            let option;
            for (let i = 0; i < oData.length; i++) {
                console.log(oData[i].name);
                option = document.createElement("option");
                option.textContent = oData[i].name;
                option.value = oData[i].alpha2Code;
                //FR par defaut
                if (option.value == "FR") {
                    option.selected = true;
                }
                document.getElementById("inputPays").appendChild(option);
                console.log(option);

            }
        }
    }
}

function getCity() {
    let sLand = document.getElementById("inputPays").value;
    let sZip = document.getElementById("inputCp").value;
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "https://api.zippopotam.us/" + sLand + '/' + sZip, true);
    xhr.send();
    console.log(xhr);

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
            let oData = JSON.parse(xhr.responseText);
            console.log(oData.places);
            // console.log(xhr.responseText);
            document.getElementById('inputVille').innerHTML = "";
            for (let i = 0; i < oData.places.length; i++) {
                let option;
                option = document.createElement('option');
                option.textContent = oData.places[i]['place name'];
                document.getElementById('inputVille').appendChild(option);
            }
        }
    }
}
document.getElementById("inputPays").addEventListener("change", function() {
    getCity();
});
document.getElementById("inputCp").addEventListener("blur", function() {
    getCity();
});