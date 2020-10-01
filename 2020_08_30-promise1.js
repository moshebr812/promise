const secondFActor=1000;
let stepProperties = {'cost': 0, 'duration': 0};

// IIFE
(() => {
    // checkConnectivityPromise2();
}) ()

const FAILURE_CHANCE = 0.20;
const errorStr = { failedFunc: '', errMsg: '', accumulatedSteps: 0 };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//      this function does NOT return promise
//      it calls internally a set of Promise
//      Promise: obliged to return either funcResolve or funcReject
//      if logically we fail on of the functions using "reject()"
//      But here we did NOT refer to an unexpected error
function applyPie_A() {
    // each promise returns the value written in its callback() -->> which is the accumulated cost so far
    buyApples( 0 )
        .then ( washApples )
        .then ( pealApples )  // put here the name of the next function
        .then ( sliceApples )
        // .then ( console.log ('DONE WITH APPLES ');
        .then ( tartForApplePie )
        .then (  (finalCost) => {
            console.log(' ===>>> Apples ready now. Iterations: ' + errorStr.accumulatedSteps  + '. /Final Cost: finalCost: '+finalCost);
        })
        .catch ( (errMsg) => {
            console.log('Did not complete (from catch). errorMessage: ' + errMsg.toUpperCase())
        });
}

function buyApples (prevCost) {
    let stepCost=5;
    console.log (`GOING to buy Apples (previousCost: ${prevCost})`);
    errorStr.accumulatedSteps=1;

    return new Promise ( (clc, rejectCallback) => {

        if ( Math.random() < FAILURE_CHANCE) {
            rejectCallback('FAILED BUYING Apples');
            return;
        }

        setTimeout (() => {
            console.log ('DONE buying Apples. accumulatedCost"  ' + (prevCost+stepCost));
            clc (prevCost + stepCost);
        }, 900) // end setTimeout
    }); // end return
} // END buyApple

function washApples (prevCost) {
    const stepCost = 1;
    errorStr.accumulatedSteps++;
    console.log('WASHING the apples.  previousCost: ' +prevCost);

    return new Promise((resolveCallback, rejectCallback) => {

        if ( Math.random() < FAILURE_CHANCE) {
            rejectCallback('FAILED washing Apples.');
            return;
        }

        let simulateError = document.querySelector('#forceUncaughtError_A').checked;
        if ( simulateError ) { // simulate the Error
            // I access a non defined variable that will crash the code and EXIT HERE
            if (forcedError===true) {
                console.log ('Error');
            }
        }

        const rejectNoReturn = document.querySelector('#rejectNoReturn').checked;    // uncomment both rejectCallback & return to see
        const rejectWithReturn = document.querySelector('#rejectWithReturn').checked;
        // alert (`adio button values:   ${rejectNoReturn} / ${rejectWithReturn}`);
        if ( rejectNoReturn ) {
            rejectCallback('failing wash Apples using rejectCallback. BUT without return');
        }
        if ( rejectWithReturn ) {
            rejectCallback ('failing washApples() using rejectCallbacl. WITH return.');
            return;
        }


        setTimeout( () => {
            console.log ('DONE washing Apples. accumulatedCost:  ' +  (prevCost + stepCost));
            resolveCallback(prevCost + stepCost);
        }, 1000);
    });
} // END washApples


function pealApples (prevCost) {
    let stepCost = 2.5;
    console.log ('START to peal Apples.  prevCost: ' + prevCost);
    errorStr.accumulatedSteps++;

    return new Promise ( (clc, rejectedCallback) => {

        if ( Math.random() < FAILURE_CHANCE ) {
            // I can return a smart object
            rejectedCallback ('FAILED pealing Apples')
            return;
        }
        setTimeout (() => {
            console.log ('DONE pealing Apples. accumulatedCost: ' + (prevCost + stepCost));
            clc (prevCost + stepCost);
        }, 750) // end setTimeout
    }); // end return of Promise
} // END buyApple


function sliceApples (prevCost) {
    const stepCost = 3;
    console.log ('START slice Apples');
    errorStr.accumulatedSteps++;

    return new Promise ( (resolveC, rejectC) => {

        if ( Math.random() < FAILURE_CHANCE ) {
            rejectC('FAILED Slicing !!!');
            return;
        }
        setTimeout( () => {
            console.log ('DONE slice Applies.  accumulatedCost: ' + (prevCost+stepCost) );
            resolveC(prevCost+stepCost);
        }, 500)

    }); // end  return of Promise

}   // END sliceApples

function tartForApplePie (previousCost) {
    let stepCost=3.75;
    let randNumber = Math.floor( (Math.random() * 100) + 1);
    console.log ('starting tartForApplePie.  Random Number = ' + randNumber);

    return new Promise ((resolve, reject) => {
        if (randNumber % 10 === 0) {
            reject ('LOGICAL ERROR: tartForApplePie ==>> (randNumber%10) = 0');
            return ;
        }

        setTimeout ( () => {
            console.log ('DONE tartForApplePie.  accumulatedCost: ' + (previousCost+stepCost));
            resolve (previousCost + stepCost)
        }, 1000);
    });
}  // END tartforApplePie


//==========================================================================================//
//==========================================================================================//
function create2ApplePies_InParallel() {
    applyPie_A();
    applyPie_A();
}

//==========================================================================================//
//==========================================================================================//
// Promise -->  calls that envelopes a function that receives a callback
//
// 00:28
function applyPie_Promise_A( bakerName='N/A' ) {
    let initialCost = 1;
    console.log ('\n\n preparing Apple by for ' + bakerName.toUpperCase());
    // try {
        return buyApples(initialCost)
            .then(washApples)
            // .then ( pealApples )
            .then((initailCost) => {
                console.log(`${bakerName} COMPLETED Baking !!!`); // + orderingPerson);
                return initailCost;
            })
            .catch((errMsg) => console.log('Apple Pie failed. Reason: ' + errMsg));
    // }
    // catch {
    //     console.log ('something went wrong');
    // }

}


function createPiesInARow() {
    console.clear();
    applyPie_Promise_A ( 'Dan')
    .then ( applyPie_Promise_A.bind( null, 'Mario'))
    // .then ( applyPie_Promise_A.bind (null, 'Elu'))
    .then ( applyPie_Promise_A.bind (null, 'Miki'))
    .then ( applyPie_Promise_A.bind (null, 'Mama Miya'))
    .catch ( (errMsg) => {
       console.log( '\n\n FAILED AND SHOULD STOP ALL BAKING \n ....' + errMsg);
    });
}

// function createPiesInARow() {
//     console.clear();
//     applyPie_Promise_A ( )
//    .then ( applyPie_Promise_A)
//    .then ( applyPie_Promise_A)
//    .then ( applyPie_Promise_A);
// }

//==========================================================================================//
//==========================================================================================//
const basicTryCatch = document.querySelector('#idBasicTryCatch')
basicTryCatch.addEventListener( 'click',  onBasicTryCatch );

function onBasicTryCatch() {
    console.clear();
    try {
        let a = Math.random();
        console.log('#1.1 successful section from try. a(random)='+a);
        let b = Math.random();
        console.log('#1.2 successful section from try. b(random)='+b);
    }
    catch (errMsg) {
        console.log ('since no error raised I should not get to here');
    }

    try {
        if ( mistakeOnPurpose) {
            console.log ('2nd try { }  catch { }')
        }
    }
    catch (errMsg) {
        console.log ('\n#2.1  ERROR !!!!. using try + catch: accessing UNDEFINED variable. !!! errMgs = ' + errMsg);
    }

    console.log( '\n #3.1 Thanks to the catch I can continue my code even after "FATAL" errors. \n\n\n');

    let inputVal = prompt ('Enter a number');
    try {
        if ( inputVal==='' ) throw ' input is empty';
        if ( inputVal===undefined ) throw ' input undefined';
        if ( inputVal===null)  throw ' input null';
        if ( inputVal.trim()==='') throw ' input had only spaces';
        if (isNaN(inputVal))  throw 'input NOT a Number';

        console.log('Input is a valid Number');

    }
    catch (errMsg) {
        console.log ('Exception Raised | in catch section | : ' + errMsg);
    }
    finally {
        console.log ('finally -->> will reach here regardless eiter after try or catch (BOTH)')
    }
}


