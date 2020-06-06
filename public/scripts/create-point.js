/*function populateUFs() {
    const ufSelect = document.querySelector("select[name=state]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => { //ArrowFunction
        return res.json()
    }).then((data) => {
        
    });
}; */

//Obtendo Estados
//Arrow Function Reduzida
function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]");
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        for(const state of states) {  //pode ser Let porém let é alterável
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` //Concatenar += => x = x + y
        };
    });
};

//Chamando Função Estados
populateUFs();

//Obtendo Cidades utilizando os ID dos Estados
function getCities(event){  //Recebendo o objeto event do EventListener
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");
    //console.log(event.target.value); //Dentro do event, há a informação event => target => value
    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`; //Zera o Select City
    citySelect.disabled = true;

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        for(const city of cities) {  //pode ser Let porém let é alterável
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` //Concatenar += => x = x + y
        };
        citySelect.disabled = false;
    });
    
};

//Obtendo ID do Estado
document
    .querySelector("select[name=uf]") //Seletor
    .addEventListener("change", getCities); //EventListener Realiza algo através dos eventos que ocorrem 
    // Parâmetro "Change" é acionado a cada mudaça de evento
    // Após a virgula, está chamando a função por referência, podendo passar dados para ela também.

//Itens de Coleta
const itemsToCollect = document.querySelectorAll(".items-grid li");
for(const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
};

//Input Hidden dos Itens
const collectedItems = document.querySelector("input[name=items]")

//Array Itens Selecionados
let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;

    //Adicionar ou Remover Classes
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    //Verificar se existe itens selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item === itemId; //Boolean
        return itemFound;
    });

    //Se sim, colocar itens no array

    //Se estava selecionado, remover
    if(alreadySelected != -1) {
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });

        selectedItems = filteredItems; //Att Selected

    //Se não estava selecionado, colocar
    } else {
        //Add no Selected
        selectedItems.push(itemId);
    };

    //Atualizar o Input Hidden dos Itens
    collectedItems.value = selectedItems;
};