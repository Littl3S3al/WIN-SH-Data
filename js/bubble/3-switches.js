const filterArray = (input, array) => {
    if (input.checked && !array.includes(input.value)) {
      array.push(input.value);
    } else if (!input.checked) {
      array = array.filter((item) => item !== input.value);
    }
    return array;
  }




document.addEventListener('click', (e) => {
    // asign variables according to switches on
    switches.forEach((input) => {
      if (input.name === 'gender') {
        gender = filterArray(input, gender);
      } else if (input.name === 'type') {
        type = filterArray(input, type);
      }
    });
  
    reported = switches[3].checked;
    action = switches[4].checked;
  
    // make sure rules aren't broken with switches
    if (e.target.type === 'checkbox') {
      toggleAlert.classList.remove('bounceAround')
      switch (e.target.value) {
        case 'f':
          if (!gender.length) {
            switches[1].click();
          }
          break;
        case 'm':
        case 'n':
          if (!gender.length) {
            switches[0].click();
          }
        case 'v':
          if (!type.length) {
            switches[6].click();
          }
          break;
        case 'p':
          if (!type.length) {
            switches[5].click();
          }
          break;
        case 'reported':
          if (!reported) {
            switches[4].checked = false;
            makeToast('Experienced Sexual Harassment', 'teal')
          } else {
            makeToast('Reported Incident', 'yellow')
          }
          break;
        case 'action':
          if(action){
            switches[3].checked = true;
            makeToast('Received Action', 'red')
          } 
          else if( !action && reported){
            makeToast('Reported Incident', 'yellow')
          }
          
          break;
        default:
          break;
      }
  
      if(switches[3].checked){reported = true}
      if(switches[4].checked){reported, action = true}
  
      // UPDATE BUBBLE DATA IF SWITCHES WERE CLICKED
      updateData(baseData, gender, type);

    }
  });