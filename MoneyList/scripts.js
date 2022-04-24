//Botão de adicionar entrada
const entryButton = document.querySelector('#entryBtn')
//Botão de subtrair saida
const outButton = document.querySelector('#outBtn')
// X
const titleCancel = document.querySelector('#title-cancel')
// Botão cancelar no modal
const cancelButton = document.querySelector('#modal-cancel')
// Botão de confirmar
const confirmButton = document.querySelector('#modal-confirm')
//Elemento Modal
const modal = document.querySelector('.modal')

let operation = ''

//Abre o modal
const openModalEntry = function() {
    document.getElementById('title-text').innerHTML = 'ADICIONAR ENTRADA'
    modal.style.display = 'block'
    operation = 'entry'
}

const openModalOut = function() {
    document.getElementById('title-text').innerHTML = 'SUBTRAIR SAÍDA'
    modal.style.display = 'block'
    operation = 'out'
}
//Fecha o modal
const closeModal = () => {
    modal.style.display = 'none'
    operation = ''
}

//Eventos de abertura
entryButton.addEventListener("click", openModalEntry)
outButton.addEventListener("click", openModalOut)

//Eventos de fechamenot
cancelButton.addEventListener("click", closeModal)
titleCancel.addEventListener("click", closeModal)
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
}}
window.addEventListener("keydown", function(e){
    if (e.keyCode == '27') {
        closeModal(e)
    }
})

// -------------------
//Arrays de valores de entrada, saida e todas transações
const entrys = []
const outs = []
const allTransactions = []

const valueField = document.getElementById('value')

//Função 
function transaction(){
    this.value = valueField.value
    this.operation = operation
}

const listTranscation = (element) => {
    const historyContainer = document.querySelector('.history-container')
    const historyRegList = document.querySelector('.history-reg-list')
    const historyReg = document.createElement('div')
    historyReg.classList.add('history-reg')
       
    historyContainer.appendChild(historyRegList)
    historyRegList.prepend(historyReg)
        
        //Icone
        const regIcon = document.createElement('span')
        if (element.operation === 'entry'){
            regIcon.classList.toggle
            regIcon.classList.add('reg-icon-entry')
        }
        if (element.operation === 'out'){
            regIcon.classList.toggle
            regIcon.classList.add('reg-icon-out')
        }
        
        //div para o valor
        const regValue = document.createElement('div')
        regValue.classList.add('history-reg-money')
        //R$
        const iconSpan = document.createElement('span')
        iconSpan.classList.add('history-money-icon')
        iconSpan.innerHTML = "R$"
        //valor do registro
        const valueSpan = document.createElement('span')
        valueSpan.classList.add('history-money-value')
        valueSpan.innerHTML = element.value

        //jutnando
        regValue.appendChild(iconSpan)
        regValue.appendChild(valueSpan)

        historyReg.appendChild(regIcon)
        historyReg.appendChild(regValue)
}

const addTransaction = () => {
    let element = new transaction

    if(element.operation === 'entry' ){
        entrys.push(element.value)
    } else if (element.operation === 'out'){
        outs.push(element.value)
    }

    allTransactions.push(element)
    listTranscation(element)
    
    const sumEntrys = entrys.reduce(function(acc, x){
        result = parseFloat(acc) + parseFloat(x)
        return result
    }, 0)    
    sumEntrys.toFixed(2)

    const entryValue = document.querySelector('#entry-value')
    entryValue.innerHTML = sumEntrys.toFixed(2)

    const sumOuts = outs.reduce(function(acc, x){
        result = parseFloat(acc) + parseFloat(x)
        return result
    }, 0)

    const outValue = document.querySelector('#out-value')
    outValue.innerHTML = sumOuts.toFixed(2)

    const profit = sumEntrys - sumOuts    
    const profitValue = document.querySelector('#profit-value')
    profitValue.innerHTML = profit.toFixed(2)

    valueField.value = ''
    operation = ''
    closeModal()

    console.log({
        entrys: entrys,
        outs: outs,
        sumEntrys: sumEntrys,
        sumOuts: sumOuts,
        profit: profit,
        elementValue: element.value,

    })

}



//Evento de adicionar transação
confirmButton.addEventListener("click", addTransaction)
modal.addEventListener("keydown", function(e){
    if (e.keyCode == '13') {
        e.preventDefault()
        addTransaction()
    }
})

// addTransaction(1502.32)


