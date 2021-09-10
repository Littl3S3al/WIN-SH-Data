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
  
    reported = switches[5].checked;
    action = switches[6].checked;
  
    // make sure rules aren't broken with switches
    if (e.target.type === 'checkbox') {
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
            switches[4].click();
          }
          break;
        case 'p':
          if (!type.length) {
            switches[3].click();
          }
          break;
        case 'reported':
          if (!reported) {
            switches[6].checked = false;
            document.querySelectorAll('.reported').forEach(reported => reported.classList.add('hidden'))
            document.querySelectorAll('.action').forEach(reported => reported.classList.add('hidden'))
          } else {
            document.querySelectorAll('.reported').forEach(reported => reported.classList.remove('hidden'))
          }
          break;
        case 'action':
          if(action){
            switches[5].checked = true;
            document.querySelectorAll('.reported').forEach(reported => reported.classList.remove('hidden'))
            document.querySelectorAll('.action').forEach(reported => reported.classList.remove('hidden'))
          } else {
            document.querySelectorAll('.action').forEach(reported => reported.classList.add('hidden'))
          }
          
          break;
        default:
          break;
      }
  
      if(switches[5].checked){reported = true}
      if(switches[6].checked){reported, action = true}
  
      // UPDATE BUBBLE DATA IF SWITCHES WERE CLICKED
      updateData(baseData, gender, type);

    }
  });