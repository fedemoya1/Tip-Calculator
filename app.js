//var bill = document.getElementById('number').value;
var bill = document.querySelector('.number');
var custom = document.querySelector(".custom");
var percentage = document.getElementsByClassName("percentage");
var people = document.querySelector("#people");
var totalBill = 0;
var per = 10;
var person = 1;

bill.addEventListener("input", totalToPay);
custom.addEventListener("input", customPer);
people.addEventListener("input", totalPersons);
document.getElementsByClassName("button")[0].addEventListener("click", reset);

for(let i = 0; i < percentage.length; i+=1){
    percentage[i].addEventListener("click", verify);
}

function verify(e){
    desactivate();
    per = e.currentTarget.innerHTML;
    per = per.slice(0, -1);
    console.log(per);
    
    e.currentTarget.classList.add('active');

    document.getElementById("custom").value = "";
    cuentas(totalBill, person, per);

}

function totalToPay(e){

    totalBill = e.target.value;

    if(!validamosNumero(totalBill)){
        totalBill = totalBill.substring(0, totalBill.length-1);
    }

    totalBill = parseFloat(totalBill);
    //if(totalBill<1){
      //  totalBill=0;
        //e.target.value = "";
    //}
    cuentas(totalBill, person, per);

}

function totalPersons(e){
    person = e.target.value;
    noError();

    if(person < 1){
        person = 1;
        e.target.value = "";
        error();
    }

    person = parseFloat(person);
    cuentas(totalBill, person, per);
}

function customPer(e){

    per = e.target.value;

    if(per < 0){
        per = 0;
        e.target.value = "";
    }
    else{
        desactivate();

    }
    console.log(e.target.value);
    cuentas(totalBill, person, per);
}

function reset(){

    desactivate();

    document.getElementById('number').value = 0;
    totalBill = 0;

    per = 10;
    document.getElementById("custom").value = "";

    person = 1;
    document.getElementById("people").value = 1;

    document.querySelector("#the-one").classList.add("active");

    noError();

    document.querySelector(".tipPerPerson").innerHTML = 0.00;
    document.querySelector(".totalPerPerson").innerHTML = 0.00;

}

function desactivate(){
    for(let i = 0; i < percentage.length; i+=1){
        document.getElementsByClassName("percentage")[i].classList.remove("active");
    }

}

function noError(){
    document.getElementsByClassName("error")[0].style.display = "none";
    document.getElementById("people").setAttribute("style", "border: none;");
}

function error(){
    document.getElementsByClassName("error")[0].style.display = "initial";
    document.getElementById("people").setAttribute("style", "border: 3px solid orangered;");
}

function cuentas(total, personas, porcentaje){
    let propinaPorPersona;
    let totalPorPersona;
    let por;

    por = porcentaje/100;

    propinaPorPersona = total*por/personas;
    //propinaPorPersona = Math.round(propinaPorPersona, -2);
    document.querySelector(".tipPerPerson").innerHTML = `$${propinaPorPersona}`;

    totalPorPersona = total/personas + propinaPorPersona;
    //totalPorPersona = Math.round(totalPorPersona, -2);
    document.querySelector(".totalPerPerson").innerHTML = `$${totalPorPersona}`;

}

function validamosNumero(s){
    var regex = /^[0-9]*\.?[0-9]*$/;
    return s.match(regex);
}