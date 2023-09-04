const cardList = [
	{id:0, 	imagePath:'images/Ke2QvY.jpg', name:'?', description:'未知', showColumn:0, number:0},
    {id:1, 	imagePath:'images/IKByd9.jpg', name:'黑點', description:'揭示者被放遂', showColumn:1, number:3},
    {id:2, 	imagePath:'images/5Zy3tM.jpg', name:'信天翁', description:'放置於揭示者面前, 當船上有2張以上即全員被放遂', showColumn:1, number:3},
    {id:3, 	imagePath:'images/gCLyz1.jpg', name:'手槍', description:'選擇一名玩家被放遂', showColumn:2, number:3},
    {id:4, 	imagePath:'images/I1w4GS.jpg', name:'特許証明', description:'選擇任意玩家移動到船上', showColumn:2, number:3},
    {id:5, 	imagePath:'images/RtUWfZ.jpg', name:'不老泉', description:'交給另一玩家, 該玩家可避免一次被放遂', showColumn:3, number:1},
    {id:6,  imagePath:'images/jmGxi1.jpg', name:'黃金國', description:'交給另一玩家, 該玩家獲得額外一張投票牌和一次投票權', showColumn:3, number:1},
    {id:7,  imagePath:'images/tF76Af.jpg', name:'亞特蘭提斯', description:'交給另一玩家, 該玩家使用後可移動到另一船上並立即行動', showColumn:3, number:1},
    {id:8,  imagePath:'images/b3j9ym.jpg', name:'★黑火藥', description:'炸毀一艘划船', showColumn:4, number:1},
    {id:9,  imagePath:'images/b3j9ym.jpg', name:'★幽閉煩燥症', description:'和另一名玩家隨機交換身份牌後秘密互看身份', showColumn:4, number:1},
    {id:10, imagePath:'images/b3j9ym.jpg', name:'★瞭望臺', description:'替換他人投票牌', showColumn:4, number:1},
    {id:11, imagePath:'images/b3j9ym.jpg', name:'★八聲鍾鳴', description:'重洗所有棋子', showColumn:4, number:1},
    {id:12, imagePath:'images/b3j9ym.jpg', name:'★表象', description:'和右邊玩家交換棋子位置', showColumn:4, number:1},
    {id:13, imagePath:'images/b3j9ym.jpg', name:'★海盜法則', description:'揭示者不能參與兩次投票', showColumn:4, number:1},
    {id:14, imagePath:'images/b3j9ym.jpg', name:'★壞血病', description:'揭示者和同船或島的玩家跳過一回合', showColumn:4, number:1},
    {id:15, imagePath:'images/b3j9ym.jpg', name:'★暴風雨', description:'揭示者位於的船或島上的寶物被放置原位', showColumn:4, number:1},
    {id:16, imagePath:'images/R0B2Dw.jpg', name:'西班牙艦隊', description:'結束遊戲', 	showColumn:5, number:1},
]
const cardBackImgPath = 'images/ixr9W3.jpg'

const cardPositionInit = [
	{pos:1, cardId:0},
	{pos:2, cardId:0},
	{pos:3, cardId:0},
	{pos:4, cardId:0},
	{pos:5, cardId:0}
]

let cardPositionHistory = [
	{pos:1, cardId:[]},
	{pos:2, cardId:[]},
	{pos:3, cardId:[]},
	{pos:4, cardId:[]},
	{pos:5, cardId:[]}
]

//const dropdownList = ['dropdown-content-1', 'dropdown-content-2', 'dropdown-content-3', 'dropdown-content-4', 'dropdown-content-5']
let dropdownList = []


// Create all cards in init list
function initCreateCards()
{
	cardPositionInit.forEach((posInfo)=>{
		cardItem = cardList[posInfo.cardId]
        createCard(cardItem,posInfo.pos)
    })
}

// Create card and add into position
function createCard(cardItem,pos){

    //create div elements that make up a card
    const cardElem = createElement('div')
    const cardInnerElem = createElement('div')
    const cardFrontElem = createElement('div')
    const cardBackElem = createElement('div')

    //create front and back image elements for a card
    const cardFrontImg = createElement('img')
    const cardBackImg = createElement('img')

    //add class and id to card element
    addClassToElement(cardElem, 'card')
    //addClassToElement(cardElem, 'fly-in')
    addIdToElement(cardElem, pos)

    //add class to inner card element
    addClassToElement(cardInnerElem, 'card-inner')
    
    //add class to front card element
    addClassToElement(cardFrontElem, 'card-front')

    //add class to back card element
    addClassToElement(cardBackElem, 'card-back')

    //add src attribute and appropriate value to img element - back of card
    addSrcToImageElem(cardBackImg, cardBackImgPath)

    //add src attribute and appropriate value to img element - front of card
    addSrcToImageElem(cardFrontImg, cardItem.imagePath)

    //assign class to back image element of back of card
    addClassToElement(cardBackImg, 'card-img')
   
    //assign class to front image element of front of card
    addClassToElement(cardFrontImg, 'card-img')
	addDatasetToElement(cardFrontImg, 'card-id', cardItem.id)

    //add front image element as child element to front card element
    addChildElement(cardFrontElem, cardFrontImg)

    //add back image element as child element to back card element
    addChildElement(cardBackElem, cardBackImg)

    //add front card element as child element to inner card element
    addChildElement(cardInnerElem, cardFrontElem)

    //add back card element as child element to inner card element
    addChildElement(cardInnerElem, cardBackElem)

    //add inner card element as child element to card element
    addChildElement(cardElem, cardInnerElem)

    //add card element as child element to appropriate grid cell
    //addCardToGridCell(cardElem,pos)
	const cardPositionClassName = mapCardIdToGridCell(pos)
    const cardPosElem = document.querySelector(cardPositionClassName)
    addChildElement(cardPosElem, cardElem)

	
	// Add card name
	const cardNameElem = createElement('div')
	addClassToElement(cardNameElem, 'card-name')
	cardNameElem.innerHTML = cardItem.name
	addChildElement(cardPosElem, cardNameElem)


	// init card position
    initializeCardPositions(cardElem,pos)
    attatchClickEventHandlerToCard(cardElem)
}

function createElement(elemType){
    return document.createElement(elemType)
}
function addClassToElement(elem, className){
    elem.classList.add(className)
}
function addIdToElement(elem, id){
    elem.id = id
}
function addDatasetToElement(elem, key, value){
    elem.setAttribute("data-"+key, value)
}
function addSrcToImageElem(imgElem, src){
    imgElem.src = src
}
function addChildElement(parentElem, childElem){
    parentElem.appendChild(childElem)
}
function addCardToGridCell(card,pos)
{
    const cardPositionClassName = mapCardIdToGridCell(pos)
    const cardPosElem = document.querySelector(cardPositionClassName)
    addChildElement(cardPosElem, card)
}
function mapCardIdToGridCell(pos)
{
    if(pos == 1)
    {
        return '.card-pos-1'
    }
    else if(pos == 2)
    {
        return '.card-pos-2'
    }
    else if(pos == 3)
    {
        return '.card-pos-3'
    }
    else if(pos == 4)
    {
        return '.card-pos-4'
    }
	else if(pos == 5)
    {
        return '.card-pos-5'
    }
}
// save init card position to cardPositionHistory[]
function initializeCardPositions(card,init_pos)
{
	var cardId = card.querySelector('.card-img').dataset.cardId
	var posIndex = cardPositionHistory.findIndex(x => x.pos == init_pos)
	cardPositionHistory[posIndex].cardId.push(cardId)
}
function attatchClickEventHandlerToCard(card){
    card.addEventListener('click', () => chooseCard(card))
}
function chooseCard(card){
	flipCard(card,true)
	//showCurrentCard()
}

function flipCard(card, flipToBack)
{
    const innerCardElem = card.firstChild
	const cardNameElem = card.nextSibling
	
	// flip back the card
    if(flipToBack && !innerCardElem.classList.contains('flip-it')){
        innerCardElem.classList.add('flip-it')
		cardNameElem.style.display = "none"
    }
	// flip open the card
    else if(innerCardElem.classList.contains('flip-it')){
        innerCardElem.classList.remove('flip-it')
		cardNameElem.style.display = "block"
    }
}
function flipCardById(id, flipToBack)
{
	const card = document.getElementsByClassName('card-pos-'+id)[0].firstChild
	flipCard(card,flipToBack)
}
function flipCardAll(flipToBack)
{
	const innerElems = Array.from(document.getElementsByClassName('card-inner'))
	innerElems.forEach((innerCardElem)=>{
		const cardNameElem = innerCardElem.parentNode.nextSibling
		if(flipToBack){
			if(!innerCardElem.classList.contains('flip-it')){
				innerCardElem.classList.add('flip-it')
				cardNameElem.style.display = "none"
			}
		}else{
			if(innerCardElem.classList.contains('flip-it')){
				innerCardElem.classList.remove('flip-it')
				cardNameElem.style.display = "block"
			}
		}
	})
}

// Update card img src and dataset, than add into cardPositionHistory[]
function updateCard(pos, newCardId){
	// update card img src
	let listIndex = cardList.findIndex(x => x.id == newCardId)
	let newPath = cardList[listIndex].imagePath
	let card = document.querySelector('.card-pos-'+pos)
	let cardImg = card.querySelector('.card-img')
	
	cardImg.setAttribute("data-card-id", newCardId)
	cardImg.setAttribute("src",newPath)
	
	// add card pos to history
	cardPositionHistory[pos-1].cardId.push(newCardId)
	
	// updatd card name
	let newCardName = cardList[listIndex].name
	let cardNameElem = card.querySelector('.card-name')
	cardNameElem.innerHTML = newCardName
}

// Dropdown potion init
function initDropdownOption(){
	// get children elements by container
	const parent = document.getElementsByClassName('dropdown-container')[0]
	const children = Array.from(parent.children)
	let list = children.map(dropdownElem => {
		// create elements for dropdown
		let id = dropdownElem.id.split("-")[1]
		let newButtonElem = createElement('button')
		let dropdownContentDivElem = createElement('div')
		
		// Add button and the main dropdown div (1-5)
		addClassToElement(newButtonElem,'dropbtn')
		addClassToElement(dropdownContentDivElem,'dropdown-content')
		addIdToElement(dropdownContentDivElem,'dropdown-content-'+id)
		addChildElement(dropdownElem, newButtonElem)
		addChildElement(dropdownElem, dropdownContentDivElem)
		
		// Add 5 sub dropdown colunms
		let subDropList = ['sub-drop-1','sub-drop-2','sub-drop-3','sub-drop-4','sub-drop-5']
		let subDropElem = []
		
		subDropList.forEach((subDropN,i)=>{
			subDropElem[i] = createElement('div')
			addClassToElement(subDropElem[i],subDropN)
			addChildElement(dropdownContentDivElem, subDropElem[i])
		})
		
		// Add card list to dropdown list
		cardList.forEach((cardInfo)=>{
			let optionElem = createElement('a')
			optionElem.innerHTML = cardInfo.name + '(' + cardInfo.number + ')'
			addClassToElement(optionElem,'dropdown-option')
			addDatasetToElement(optionElem, 'option-id', cardInfo.id)
			
			if(cardInfo.showColumn == 1){
				addChildElement(subDropElem[0], optionElem)
			}
			else if(cardInfo.showColumn == 2){
				addChildElement(subDropElem[1], optionElem)
			}
			else if(cardInfo.showColumn == 3){
				addChildElement(subDropElem[2], optionElem)
			}
			else if(cardInfo.showColumn == 4){
				addChildElement(subDropElem[3], optionElem)
			}
			else if(cardInfo.showColumn == 5){
				addChildElement(subDropElem[4], optionElem)
			}
			else{
				// unknown
			}
			
		})
		//return dropdownElem.id.split("-")[1]
		dropdownList.push(dropdownContentDivElem.id)
	})
	//console.log(dropdownList)
}

function initClearbtn(){
	const parent = document.getElementsByClassName('clear-container')[0]
	const children = Array.from(parent.children)
	let list = children.map(clearElem => {
		// set clear btn
		let ClearButtonElem = createElement('button')
		addClassToElement(ClearButtonElem,'clearbtn')
		addChildElement(clearElem, ClearButtonElem)
	})
}

// On click Dropdown button
$(document).on('click', '.dropbtn', function () {
	var clickedId = $(this).next().attr('id')
	
	// loop throw dropdownList
	dropdownList.forEach((curId)=>{
		var openDropdown = document.getElementById(curId)
		// 1. close all others
		if(curId != clickedId){
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show')
			}
		}
		// 2. toggle itself
		else{
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show')
			}else{
				openDropdown.classList.add("show")
				document.getElementById(clickedId).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
			}
		}
	})
})

// On click clear button
$(document).on('click', '.clearbtn', function () {
	var clickedId = $(this).parent().attr('id')
	var lastPosIndex = clickedId.split("-").length-1
	var pos = clickedId.split("-")[lastPosIndex]
	//console.log(clickedId)
	//console.log(pos)
	updateCard(pos,0)
	showCurrentCard('history',true)
	// flip open that card
	flipCardById(pos,false)
})

// On click dropdown option and update card
$(document).on('click', '.dropdown-option', function () {
	var dropdownId = $(this).parent().parent().attr('id')
	var optionDataId = $(this).data('option-id')
	var pos = dropdownId.split("-")[2]
	//console.log('pos:'+pos)
	//console.log('optionDataId:'+optionDataId)
	updateCard(pos,optionDataId)
	showCurrentCard('history',true)
})

// On click view button and toggle show/hide all cards
$(document).on('click', '.viewbtn, .unviewbtn', function () {
	$(this).toggleClass('viewbtn unviewbtn')
	
	if($(this).attr('class')=='viewbtn'){
		flipCardAll(true)
	}else{
		flipCardAll(false)
	}
})

function updateBackground(showOption='',showDetails=true){
	$('.background').height(document.body.scrollHeight+20);
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
	updateBackground()
	if (!event.target.matches('.dropbtn')) {
		dropdownList.forEach((curId)=>{
			var openDropdown = document.getElementById(curId)
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show')
			}
		})
	}
}


function showCurrentCard(showOption='',showDetails=true){
	if(showOption == 'history'){
		console.log('show history')
		var return_log = ''
		cardPositionHistory.forEach((Info)=>{
			if(showDetails){
				var log_temp = 'card[' + Info.pos + ']:details['
			}else{
				var log_temp = 'card[' + Info.pos + ']:id['
			}
			
			Info.cardId.forEach((Id)=>{
				if(showDetails){
					log_temp += cardList[Id].name + '(' + cardList[Id].description + '),'
				}else{
					log_temp += Id + ','
				}
			})
			log_temp = log_temp.slice(0, -1) +']'
			return_log += log_temp + '<br>'
			console.log(log_temp)
		})
		document.getElementById('log_temp').innerHTML = return_log;
		return
	}
	cardPositionHistory.forEach((Info)=>{
		console.log('card[' + Info.pos + ']:' + Info.cardId[Info.cardId.length-1])
	})
}

$(document).ready(function(){
	initCreateCards()
	initDropdownOption()
	initClearbtn()
	showCurrentCard('history',true)
	updateBackground()
})


