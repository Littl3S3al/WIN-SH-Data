

const bubbleTip = document.querySelector('.my-tooltip')
const bubTipCountry = document.querySelector('#tip-country')
const bubTipParticipants = document.querySelector('#tip-participants-value')
const bubTipPrevalence = document.querySelector('#tip-prevalence-value')
const bubTipReported = document.querySelector('#tip-reported-value')
const bubTipAction = document.querySelector('#tip-action-value')



function setUpTip (location, data, clicked){

    

    if(location){
        

        let index = data.findIndex(x => x.location === location)

        let participants = data[index].participants;
        let experienced = Math.round(data[index].experienced);
        let reported = Math.round(data[index].reported);
        let action = Math.round(data[index].action);

        experienced = experienced ? experienced : 0
        reported = reported ? reported : 0
        action = action ? action : 0


        bubTipCountry.innerText = location.toUpperCase()
        bubTipParticipants.innerText = participants
        bubTipPrevalence.innerText = experienced
        bubTipReported.innerText = reported
        bubTipAction.innerText = action
    }

    if(!clicked){
        
        bubbleTip.classList.add('tip-hide') 
        bubbleTip.classList.remove('tip-show')
        setTimeout(() => {bubbleTip.style.display = 'none'}, 500)
    } else if(clicked === 'clicked') {
        bubbleTip.style.display = 'block'
        bubbleTip.classList.remove('tip-hide')
        bubbleTip.classList.add('tip-show')
    }
    
}