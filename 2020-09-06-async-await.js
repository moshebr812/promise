// alert ('connect JS file 2020-09-06-async-await');


//=================================================================//
function caseA() {
    usingTimerBasicNoAsync();
}

function usingTimerBasicNoAsync() {
    console.log ('#1. before calling setTimeout in usingTimerBasicNoAsync');
    let checkRetVal ='init';
    checkRetVal= setTimeout(() => {
        console.log ('#2. timer expired for usingTimerBasicNoAsync')
        return 'caseA: Returned value set within setTimeout'
    },1500);

    console.log ('#3. end of function usingTimerBasicNoAsync out of setTimeout');
    console.log ('#4. checkRetVal = ' + checkRetVal);
}
//=================================================================//

//=================================================================//
function caseB() {
    usingTimerBasic_With_Async();
}

async function usingTimerBasic_With_Async() {
    console.log ('#1. before calling setTimeout in usingTimerBasic_With_Async');
    let checkRetVal ='init';
    checkRetVal = await setTimeout(() => {
        console.log ('#2. timer expired for usingTimerBasic_With_Async')
        return  'caseB: Returned value set within setTimeout'
    },1500);

    console.log ('#3. end of function usingTimerBasic_With_Async out of setTimeput');
    console.log ('#4. checkRetVal = ' + checkRetVal);
}


//=================================================================//
async function caseC() {
//     usingSetTimePutWithAwait();
// }
//
// async function usingSetTimePutWithAwait () {
    let retVal;
    retVal = await wrapTimer_With_Promise();
    console.log ('AFTER 1st call to await wrapTimer_With_Promise() . retVal = ' + retVal +'\n.') ;
    retVal = await wrapTimer_With_Promise();
    console.log ('AFTER 2nd call to await wrapTimer_With_Promise() . retVal = ' + retVal + '\n.');
}

function wrapTimer_With_Promise() {
    console.log ('#1. wrapTimer_With_Promise - start');

    return new Promise ( (resolve, reject)  => {
        setTimeout( () => {
            console.log ('#2. wrapTimer_With_Promise - timer expired');
            // I must ADD the resolve else functions / variables that wait for Promise to report "DONE" will never get
            resolve ('returned from setTimeout after ' + Math.random().toFixed(3));
        }, 1500);
    });
    // THIS LINE IS NEVER EXECUTED
    console.log ('#3. wrapTimer_With_Promise - out of timer - will never reach here');
}


//=================================================================//
function caseD() {
        usingSetTimePutWithAwait();
}
async function usingSetTimePutWithAwait () {
    let t = 'Before 1st ';
    console.log(t);
    t = await wrapTimer_With_Promise();
    console.log ('After 1st \n .......' + t + '\n.');

    t = await wrapTimer_With_Promise();
    console.log ('After 2nd \n ....===>>>' + t + '\n.');
}

function caseE() {
    let userIsAsString = 'init';
    console.log ('BEFORE fetch.  userIsAsString = ' + userIsAsString);
    userIsAsString = fetch ('https://jsonplaceholder.typicode.com/todos');
    // userIsAsString = userIsAsString.text();
    console.log ('AFTER fetch.  userIsAsString = ' + userIsAsString);
}

function caseF() {
    fetchUsers();
    // let userIsAsString = 'init';
    // console.log ('BEFORE fetch.  userIsAsString = ' + userIsAsString);
    // userIsAsString = await fetch ('https://jsonplaceholder.typicode.com/todos');
    // console.log ('AFTER fetch.  userIsAsString = ' + userIsAsString);
}

async function fetchUsers () {
    let userIsAsString = 'init';
    console.log ('BEFORE fetch.  userIsAsString = ' + userIsAsString);
    userIsAsString = await fetch ('https://jsonplaceholder.typicode.com/todos');
    userIsAsString = await userIsAsString.text();
    console.log ('AFTER fetch.  userIsAsString = ' + userIsAsString);
}


//=================================================================//
//=================================================================//
async function caseG_Promise_Async() {
    let accumualtedMsg = 'Starting ..now..';
    try {
        accumualtedMsg = await buyApples(accumualtedMsg);
        accumualtedMsg = await pealApples(accumualtedMsg);
        accumualtedMsg = await bakeApples(accumualtedMsg);
        console.log('\n FINAL !!! \n' + accumualtedMsg);
    }
    catch (e) {
        console.log ('\n\n FAILED somewhere / ' + e);
        throw new Error ( 'OOOO that hurts' );
    }
}

function caseG_Promise_Then() {
    let msg = 'starting !!!!';
    bakeApples(msg)
        .then (pealApples )
        .then (bakeApples )
        .then ( (msg) => {
            console.log ('DONE //// \n '+ msg);
        })
        .catch ( (e) => {
        console.log ('F A I L E D the flow at - ' + e);
        });
}

function buyApples(prevMsg = 'empty') {
    console.log ('START buyApples');

    return new Promise ( (resolve, reject) => {
       setTimeout ( () => {
           console.log ( 'DONE buyApples' );
           resolve (prevMsg + '/\n buyApples ');
       },1500)
    });
}

function pealApples(prevMsg = 'emmpty') {
    console.log ('START pealApples');

    return new Promise ( (resolve, reject) => {
        // if I want to fail need to call reject() + return
        reject ('FAIL IN pealApples');
        return ;

        setTimeout ( () => {
            console.log ( 'DONE pealApples' );
            resolve (prevMsg + '/\n pealApples ');
        },1500)
    });
}

function bakeApples(prevMsg = 'emmpty') {
    console.log ('START baking');
    return new Promise ( (resolve, reject) => {
        setTimeout ( () => {
            console.log ( 'DONE baking' );
            resolve (prevMsg + '/\n baking ');
        },1500)
    });
}
