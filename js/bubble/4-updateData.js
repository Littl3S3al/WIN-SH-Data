//  *(runs at start) bring in the csv data - then the json data - then call update
d3.csv('data/completed.csv')
    .then((d) => {
        baseData = d
        updateData(baseData)
})





// variable to hold the array
let finalData = [];
let perCountryData = [];

// *check which country/perspective the user is viewing
function updateData(baseData) {
    let key;
    let parent;
    switch (perspective) {
        case 'global': 
            key = globalKey
            parent = 'global'
            break
        case 'africa': 
            key = africaKey
            parent = 'africa'
            break
        case 'sea': 
            key = seaKey
            parent = 'sea'
            break
        default:
            console.log('no viewpoint selected')
    }
    globalCalc(baseData, key, parent)
}

function globalCalc(baseData, key, parent){

    let participants = 0
    let experienced = 0
    let reported = 0
    let action = 0

    finalData = []
    perCountryData = []

    finalData.push({name: parent, parent: ''})
    key.forEach(location => {

        // [total, finalExperience, finalAction, finalNoAction, finalNotReported]
        let dataArray = filterData(baseData,location, parent)
        // *pushing values for the key
        participants += dataArray[0]
        experienced += dataArray[1]
        reported += dataArray[2] + dataArray[3]
        action += dataArray[2]

        finalData.push(
            {trueName: location, name: location, parent: parent, participants: dataArray[0]},
            {trueName: 'experience', name: location + ' experience', parent: location},

            {trueName: 'not reported', name: location + ' not reported', parent: location + ' experience', value: dataArray[4]/ dataArray[0]/6},
            {trueName: 'not reported', name: location + ' not reported', parent: location + ' experience', value: dataArray[4]/ dataArray[0]/6},

            {trueName: 'reported', name: location + ' reported', parent: location + ' experience'},

            {trueName: 'not reported', name: location + ' not reported', parent: location + ' experience', value: dataArray[4]/ dataArray[0]/6},                       
            {trueName: 'not reported', name: location + ' not reported', parent: location + ' experience', value: dataArray[4]/ dataArray[0]/6},            
            {trueName: 'not reported', name: location + ' not reported', parent: location + ' experience', value: dataArray[4]/ dataArray[0]/6},
            {trueName: 'not reported', name: location + ' not reported', parent: location + ' experience', value: dataArray[4]/ dataArray[0]/6},

            {trueName: 'no action', name: location + ' no action', parent: location + ' reported', value: dataArray[3]/ dataArray[0]/3},
            {trueName: 'no action', name: location + ' no action', parent: location + ' reported', value: dataArray[3]/ dataArray[0]/3},

            {trueName: 'action', name: location + ' action', parent: location + ' reported', value: dataArray[2]/ dataArray[0]},

            {trueName: 'no action', name: location + ' no action', parent: location + ' reported', value: dataArray[3]/ dataArray[0]/3},
            
            

            )

            perCountryData.push(
                {
                    location: location, 
                    participants: dataArray[0], 
                    experienced: dataArray[1]/dataArray[0]*100, 
                    reported: (dataArray[2] + dataArray[3])/dataArray[1]*100, 
                    action: dataArray[2]/(dataArray[2] + dataArray[3])*100
                }
            )

       })

        // *percentages for the key
        let ActualExperienced = Math.round(experienced/participants*100)
        let ActualReported = Math.round(reported/experienced*100)
        let ActualAction = Math.round(action/reported*100)

       if(!ActualExperienced){experienced = 0}
       if(!ActualReported){reported = 0}
       if(!ActualReported){action = 0}

       locationSpan.innerText = perspective 
       participantsSpan.innerText = participants
       prevalenceSpan.innerText = ActualExperienced
       reportedSpan.innerText = ActualReported
       actionSpan.innerText = ActualAction


       bubbles(finalData, perCountryData)
}

function filterData(baseData, keyItem, parent) {
    let filteredArray
    if(parent === 'global'){
        filteredArray = baseData.filter(d => d.region === keyItem)
    } else {
        filteredArray = baseData.filter(d => d.region === parent && d.country === keyItem)
    }
    return baseFilter(filteredArray)
    
}

function baseFilter(filteredArray) {
    filteredArray = filteredArray.filter(d => gender.includes(d.gender))

    // get the total participants
    let total = d3.sum(filteredArray, d => d.total_answered )
    
    // get the overall totals for the region
    let v_prev = d3.sum(filteredArray, d => d.v_prevalence)
    let v_rep = d3.sum(filteredArray, d => d.v_reported)
    let v_act = d3.sum(filteredArray, d => d.v_action)
    let p_prev = d3.sum(filteredArray, d => d.p_prevalence)
    let p_rep = d3.sum(filteredArray, d => d.p_reported)
    let p_act = d3.sum(filteredArray, d => d.p_action)

    let action = 0
    let noAction = 0
    let notReported = 0

    // calculate verbal/physical and half if both are true
    if(type.includes('v')){
        action += v_act
        noAction += v_rep - v_act
        notReported += v_prev - v_rep
    }
    if(type.includes('p')){
        action += p_act
        noAction += p_rep - p_act
        notReported += p_prev - p_rep
    }
    if(type.length === 2){
        action /= 2
        noAction /= 2
        notReported /= 2
    }

    let finalExperience = action + noAction + notReported
    

    return [total, finalExperience, action, noAction, notReported]

    
}

