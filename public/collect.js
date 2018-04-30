let httpRequest;

window.onload = drawButtons();

document.getElementById('submitButton').addEventListener('click', submitLoc);

function drawButtons(){
  let inputBox = document.createElement('div');
  inputBox.setAttribute("class", "inputBox");
  
  // let inputForm = document.createElement('form');
  // inputForm.setAttribute("action", "/addloc");
  // inputForm.setAttribute("method", "post");
  // inputBox.appendChild(inputForm);
  
  let checkbox1 = document.createElement('input');
  checkbox1.setAttribute("id", "checkbox1");
  checkbox1.setAttribute("type", "checkbox");
  checkbox1.setAttribute("name", "loc")
  checkbox1.setAttribute("value", "dFount");
  inputBox.appendChild(checkbox1);
  
  let label1 = document.createElement('label');
  label1.setAttribute("for", "checkbox1");
  label1.textContent = 'Drinking Fountain';
  inputBox.appendChild(label1)
  
  let checkbox2 = document.createElement('input');
  checkbox2.setAttribute("id", "checkbox2");
  checkbox2.setAttribute("type", "checkbox");
  checkbox2.setAttribute("name", "loc")
  checkbox2.setAttribute("value", "bathroom");
  inputBox.appendChild(checkbox2);
  
  let label2 = document.createElement('label');
  label2.setAttribute("for", "checkbox2");
  label2.textContent = 'Bathrooms';
  inputBox.appendChild(label2)
  
  let checkbox3 = document.createElement('input');
  checkbox3.setAttribute("id", "checkbox3");
  checkbox3.setAttribute("type", "checkbox");
  checkbox3.setAttribute("name", "loc")
  checkbox3.setAttribute("value", "other");
  inputBox.appendChild(checkbox3);
  
  let label3 = document.createElement('label');
  label3.setAttribute("for", "checkbox3");
  label3.textContent = 'Other';
  inputBox.appendChild(label3)
  
  let submitButton = document.createElement('input');
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("id", "submitButton");
  inputBox.appendChild(submitButton);
  
  container.appendChild(inputBox)
}

function findValues(){
  let checkVal1 = document.getElementById('checkbox1').checked;
  let checkVal2 = document.getElementById('checkbox2').checked;
  let checkVal3 = document.getElementById('checkbox3').checked;
  return('drink_fount=' + checkVal1 + '&bathroom=' + checkVal2 + '&other=' +  checkVal3)
  
}


function submitLoc(){
  let info = findValues();
  httpRequest = new XMLHttpRequest();
  
  if (!httpRequest){
    console.log('Cannot create XMLHTTP instance');
    return false;
  }
  httpRequest.onreadystatechange = alertContents;
  httpRequest.open('POST', '/addloc');
  httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  httpRequest.send(info);
}

function alertContents(){
  if (httpRequest.readyState === XMLHttpRequest.DONE){
    if (httpRequest.status === 200){
      console.log(httpRequest.responseText);
    } else {
      console.log('There was a problem with the request');
    }
  }
}