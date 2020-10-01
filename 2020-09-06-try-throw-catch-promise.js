// alert ('check connection js');
// const dddwTrayCatch_A = document.querySelector('#idTrayCatch_A');

// =========================================== Code for the selection of try catch button #1 ===================== //
function dddwTrayCatch_A() {
    const selectedFlow = document.querySelector('#idTrayCatch_A').value;

    switch (selectedFlow) {

        case 'undefinedVariable':
            // Accessing undefined Var. JS will throw and error. "Catch it"
            console.log('\n\naccess a VARIABLE that |is not defined| ');
            try {
                let x = 8;
                x += notDefinedVar ? 10 : 5;   // notDefinedVar was NOT Defined
                console.log('I should NEVER reach this line');
            }
            catch (errMsg) {
                console.log( 'FAILED. err thrown by JS.  errMsg = ' + errMsg);
            }
            break;

        case 'propertyNotDefined':
            // Accessing undefined property. JS will throw and error. "Catch it".
            // Not the variable is DEFINED
            console.log('\n\nAccess a PROPERTY that is not defined');
            try {
                let y = [10, 20, 30];
                console.log('Access a property that is not defined ||  ' + y[9].name);
            }
            catch (errMsg) {
                console.log( 'FAILED. err thrown by JS.  errMsg = ' + errMsg);
            }
            break;
        case 'logicalErrUsingThrow':
            console.log ('\n\nbusiness logical Error --> Using "Throw" ');
            try {
                let x = 5;
                console.log(Math.pow(5, 3));
                throw "I want to fail this Math Functions"
            }
            catch (e) {
                console.log ('FAILED ON Purpose ... ' + e);
            }
            break;

        case 'forgotToCatchMyOwnThrow':
            console.log('\n\n What happens when u raise your logical flow yet forget to code the catch()')
            throw ' failing due to Business .... but did NOT catch';

        default:
            console.log ('\n scenario not yet coded');
    }
}

// =========================================== simple try, catch, throw "error" ===================== //
const throwBasicErrMessgage = ( () =>{
    try {
        alert ('Example of try --> throw --> catch using a simple error text in the catch');
        throw '==>> throw LOGICAL ERROR';
    }
    catch (e) {
        console.log('\n CATCHING THE THROW & print the errMsg: \n ....' + e);
    }
});

// =========================================== try, catch, throw "error" using myObj extends ERROR ===================== //
class MyErrorObjects extends Error {
    eSeverity;
    eNumber;
    eModule;

    constructor(pSeverity, pNumber, pModule, pMsg) {
        super(pMsg);
        this.eSeverity = pSeverity;
        this.eNumber = pNumber;
        this.eModule = pModule;
    }
}

const extendThrowErrMessgage = ( () => {
    console.log ('\n');
     let myErrObj = {'step': 'init',  'errText': 'bla bla'};
     try {
        console.log('ERROR:  example 1: replacing ERROR obj with my own obj');
        if (1===1) {
            myErrObj.errText = 'validation failed';
            throw myErrObj;
        }
    }
    catch (errObj) {
        console.log ('thrown errObj = ' + JSON.stringify(errObj) );
    }

    console.log ('\n');
     try {
         if (2===2) {
             console.log('throwing now extened ErrObj')
            let myInheritedErrObj = new MyErrorObjects( 'ERROR', 909, 'Learning', 'is 2 equal 2');
             throw myInheritedErrObj;
         }
     }
     catch (eObj) {
         console.log (`catch:  ${eObj.message}  eModule: ${eObj.eModule}`);
         console.log (`name:  ${eObj.name}  fileName: ${eObj.filename}  lineNumber: ${eObj.lineNumber}`);
     }
});

// =========================================== 3 promises - 3 steps of baking a pizza ===================== //
// Timer used setTimeout
const durationFactor = 1000;
// Pointers to the 3 checkboxes that simulate a logical failure
const failRepareDough = document.querySelector('#idFailRepareDough');
const failRiseDough = document.querySelector('#idFailRiseDough');
const failAddSouce = document.querySelector('#idFailAddSouce');
const failRandom = document.querySelector('#idFailRandom');

failRandom.addEventListener( 'click', () => {
    document.querySelector('#idFailRatio').disabled = !failRandom.checked ;
});

function isRandomFailure() {
    // return Boolean true / false if to fail the action
    if (!failRandom.checked) {return false}

    let threshold = document.querySelector('#idFailRatio').value;

    if ( Math.random() < Number(threshold)) {
        console.log( ' isRandomFailure - TRUE') ;
        return true;
    } else {
        console.log( ' isRandomFailure - FALSE') ;
        return false;
    }
}

// Pointers to the 3 Radio Buttons at which I can specify which failure to generate for Which Customer of the Apple Pie
const lindaFailPrepareDough = document.querySelector(`#failPrepareForLinda`);
const lindaFailRiseDough    = document.querySelector(`#failRiseForLinda`);
const lindaFailAddSouce     = document.querySelector(`#failSouceForLinda`);

lindaFailPrepareDough.addEventListener( 'change', () => {
    failRepareDough.checked = true;
    failRiseDough.checked = false;
    failAddSouce.checked = false;
});

lindaFailRiseDough.addEventListener( 'change', () => {
    failRepareDough.checked = false;
    failRiseDough.checked = true;
    failAddSouce.checked = false;
});

lindaFailAddSouce.addEventListener( 'change', () => {
    failRepareDough.checked = false;
    failRiseDough.checked = false;
    failAddSouce.checked = true;
});

function initPizzaStats (customerName) {
    // init an Object that will accumulate all steps of Pizza Preparations
    let pizzaFollowUp = [{'recordType': 'summary', 'lastStep': '', 'cost': 0, 'duration': 0, 'customer': customerName, 'status': 'pending'}];
    return pizzaFollowUp;
}

function prepareDough (pizzaStatsArray) {
    let doughAttributes= {
        recordType: 'step',
        stepName: 'prepareDough',
        cost: 1.5,
        duration: (1 * durationFactor),
    }

    pizzaStatsArray[0]['lastStep'] = doughAttributes.stepName;
    pizzaStatsArray[0]['status'] = 'START';

    const failPrepare = failRepareDough.checked;
    console.log (`START prepare dough ## ${pizzaStatsArray[0]['customer']} ##` );

    pizzaStatsArray.push (doughAttributes);

    return new Promise ( (resolve, reject) => {
        // if (failPrepare) {
        if (  (failPrepare)  || (isRandomFailure()) ) {
            // simulate a failure
            pizzaStatsArray[0]['status'] = 'FAILED';
            reject (`${pizzaStatsArray[0]['lastStep'] } / ${pizzaStatsArray[0]['status']} / customer: ${pizzaStatsArray[0]['customer']}`);
            return ; // must return after reject() !!! else the code below is executed as well
        }

        // Return the Object with the full history of Actions
        setTimeout( () => {
            console.log('DONE preparing dough');
            pizzaStatsArray[0]['cost'] += doughAttributes.cost;
            pizzaStatsArray[0]['duration'] += doughAttributes.duration;
            pizzaStatsArray[0]['status'] = 'DONE';
            resolve (pizzaStatsArray);
        } , doughAttributes.duration);
    });  // END return new Promise
} // EMD prepareDough

const letDoughRise = ( (pizzaStatArray) => {
    let stepAttributes= {
        recordType: 'step',
        stepName: 'letDoughRise',
        cost: 2.15,
        duration: (1.5 * durationFactor),
    }

    let failRise = failRiseDough.checked;
    pizzaStatArray[0]['lastStep'] = stepAttributes.stepName;
    pizzaStatArray[0]['status'] = 'START';

    console.log (`START let Dough Rise ## ${pizzaStatArray[0]['customer']} ##` );
    // we keep info of all Steps
    pizzaStatArray.push( stepAttributes);

    return new Promise ( (resolve, reject) => {

        if (  (failRise)  || (isRandomFailure()) ) {
                pizzaStatArray[0]['status'] = 'FAILED';
                return reject (`${pizzaStatArray[0]['lastStep']} / ${pizzaStatArray[0]['status']} / ${pizzaStatArray[0]['customer']}`);
        }

        setTimeout ( () => {
            console.log ('DONE raise Dough');
            pizzaStatArray[0]['cost'] += stepAttributes.cost;
            pizzaStatArray[0]['duration'] += stepAttributes.duration;
            pizzaStatArray[0]['status'] = 'DONE';
            resolve (pizzaStatArray);
        }, stepAttributes.duration);
    });
}); // EMD letDoughRise

const addSouceToPizza = ( (pizzaHistoryArray) => {
    let souceAttributes= {
        recordType: 'step',
        stepName: 'addSouce',
        cost: 0.75,
        duration: (1.2 * durationFactor),
    }

    let failSouce = failAddSouce.checked;
    pizzaHistoryArray[0]['lastStep'] = souceAttributes.stepName;
    pizzaHistoryArray[0]['status'] = 'START';

    console.log (`START add Souce ## ${pizzaHistoryArray[0]['customer']} ##` );

    pizzaHistoryArray.push (souceAttributes);

    return new Promise( (resolve, reject) => {
       if (  (failSouce)  || (isRandomFailure()) ) {
           pizzaHistoryArray[0]['status'] = 'FAILED';
           // reject can ONLY Return a String
           return reject (`Failed AddSouce for ${pizzaHistoryArray[0]['customer']}`);
       }
        setTimeout( () => {
           console.log('DONE Add Souce');
           pizzaHistoryArray[0]['cost'] += souceAttributes.cost;
           pizzaHistoryArray[0]['duration'] += souceAttributes.duration;
           pizzaHistoryArray[0]['status'] = 'DONE';
           resolve (pizzaHistoryArray);
       },souceAttributes.duration);
    });
});
// =========================================== bake_1_Pizza() - calling the 3 promises ===================== //
const bake_1_Pizza = (customerName) => {
    // console.clear();
    console.log('\n');
    if ( !customerName) {
        // i.e. no names passed in string
        customerName = 'anonymous customer';
    }

    let pizzaStats = initPizzaStats(customerName);

    prepareDough(pizzaStats)
        // note I MUST put the res as a parameter in the last .then to access it at
        .then ( letDoughRise )
        .then ( addSouceToPizza )
        .then ( (lastResult) => {
          console.log('Summary after 1 Pizza ended for '+lastResult[0]['customer']+ '\n' + JSON.stringify(lastResult) )
        })
        .catch ( (e) => {
            console.log (` (1.1) Failed bake_1_Pizza  (one single pizza) `);
            console.log (` (1.2) ____${e} `);
            // console.log (` (1.2) lastStep:  status: ${e.lastStep}  Message:  ${e.status} `);
        });
}   // END bake_1_Pizza

const bake_2_Pizzas_inParallel = () => {
    console.clear();
    bake_1_Pizza('Linda');
    bake_1_Pizza( 'Bob');
}


// =========================================== to call bakePizza in Sequence more the=an Once ===================== //
const bake_a_Pizza_ReturnsPromise = (pCustomerName) => {
    if ( !pCustomerName) {
        // i.e. no names passed in string
        pCustomerName = ' Customer-???';
    }
    let pizzaHistory = initPizzaStats(pCustomerName);

    // since prepareDough returns promise we can cause bake_a_Pizza_ReturnsPromise to return a Promise as well
    return  prepareDough(pizzaHistory)
        // note I MUST put the res as a parameter in the last .then to access it at
        .then ( letDoughRise )
        .then ( addSouceToPizza )
        .then ( (endResult) => {
            console.log('Pizza COMPLETED FOR: '+pizzaHistory[0]['customer']+' \n' + JSON.stringify(endResult) );
            // if I don't return this I can't ACCESS THE returned Object, such as when using Promise.all ()
            return pizzaHistory;
        })
        // UN-COMMENT THIS SECTION IF YOU WANT THE MAIN FUNCTION TO PROCEED TO PIZZA N+1
        // EVEN IF PIZZA N FAILED .... I return to the "then"
        .catch((errMsg) => {
            console.log ('Failed --> errMsg: ' + errMsg);
        })
}


const bake_N_Pizzas_inSequence = () => {
    console.clear();
    bake_a_Pizza_ReturnsPromise('Omer')
        // the .bind here is required so we can pass the name and still have promise
        .then ( bake_a_Pizza_ReturnsPromise.bind (null, 'Susu') )
        .then ( bake_a_Pizza_ReturnsPromise.bind (null, 'Naftali '))
        .catch ( (e) => {
            console.log ('Failed Pizza for ' + e);
            console.log('.');
        });
}

function PromiseAll_1() {
    console.clear();
    alert ('promise all');
    Promise.all( [
        bake_a_Pizza_ReturnsPromise('Nihal'),
        bake_a_Pizza_ReturnsPromise('Sami'),
        bake_a_Pizza_ReturnsPromise('Libi')
    ]).then( ( [ resA, resB, resC ] ) => {
        console.log('\n\n ===========\nDone all with success\n');
        console.log (JSON.stringify( resA ));
        console.log('Total Cost: ' +
                    Number(Number(resA[0]['cost']) + Number(resB[0]['cost']) + Number(resC[0]['cost'])).toFixed(2)
                );
     })
        .catch( (e) => {console.log ('\n\n <<<>>> \nPromiseAll ended with ERROR: ' + e + '\n');
     })
}   // END PromiseAll_1

