let key = ['total_answered', 'v_not_reported', 'v_action', 'v_no_action','p_not_reported',	'p_action', 'p_no_action'];

let experienceData;
let male, female, non;
male = {
    gender: 'Male',
    total: 0,
    physical: 0,
    verbal: 0
};
female = {
    gender: 'Female',
    total: 0,
    physical: 0,
    verbal: 0
};
non = {
    gender: 'GNC',
    total: 0,
    physical: 0,
    verbal: 0
};

d3.csv('data/compiled.csv').then(data => {

    let newData = d3.group(data, d => d.gender)
    return newData
}).then(value => {
    let genders = ['m', 'f', 'n']
    let objects = [male, female, non]

    for (i = 0; i < genders.length; i++){
        let total = d3.sum(value.get(genders[i]), d => d.total_answered)
        let verbal = d3.sum(value.get(genders[i]), d => d.v_total)
        let physical = d3.sum(value.get(genders[i]), d => d.p_total)

        objects[i].total += total;
        objects[i].physical += physical;
        objects[i].verbal += verbal;
    }
    objects.forEach(object => {
        object.verbal = object.verbal/object.total*100;
        object.physical = object.physical/object.total*100
    })
    return [non, male, female]
}).then(res => {
    // verbal harassment
    experienceData = res;
})


const colourScale = [
    '#2eb5c3',
    '#4fc6c2',
    '#72d6be',
    '#97e5bb',
    '#bcf3ba',
    '#e3ffbb',
    '#e0e587',
    '#e4c854',
    '#eda725',
    '#f77f00',
    '#ff4700'
   ]

   