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
          }
          break;
        case 'action':
          switches[5].checked = true;
          break;
        default:
          break;
      }
  
      if(switches[5].checked){reported = true}
      if(switches[6].checked){reported, action = true}
  
      // UPDATE BUBBLE DATA IF SWITCHES WERE CLICKED
      updateData(gender, type);

    }
  });
  
  function filterArray(input, array) {
    if (input.checked && !array.includes(input.value)) {
      array.push(input.value);
    } else if (!input.checked) {
      array = array.filter((item) => item !== input.value);
    }
    return array;
  }
  
  
  
  

  
  