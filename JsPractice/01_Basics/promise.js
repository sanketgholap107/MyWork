/**
 * promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
 * 
 * PROMISES HAS 3 STATES:
 *  -pending
 *  -fulfilled
 *  -rejected
 */

const promiseOne = new Promise(function (resolve, reject) {
    // do an async task
    // DB calls,cryptography,network
    setTimeout(function () {
        console.log('Async task is complete');
        resolve()
    }, 1000)
})

// 'resolve' has a connection with then()
promiseOne.then(function () {
    console.log("promise consumed");
})

new Promise(function (resolve, reject) {
    setTimeout(function () {
        console.log("async task 2");
        resolve()
    }, 1000)

}).then(function () {
    console.log("async 2 resolved");
})

const promiseThree = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve({ username: 'sanket107', email: 'sanket107@yopmail.com' })
    }, 1000)
})

promiseThree.then(function (user) {
    console.log(user);
})

const promiseFour = new Promise(function (resolve, reject) {
    setTimeout(function () {
        let error = false;
        if (!error) {
            resolve({ username: 'john' })
        } else {
            reject('something went wrong')

        }
    }, 1000)
})

promiseFour.then((user) => {
    console.log(user);
    return user.username;
}).then((username) => {
    console.log(username);
}).catch((error) => {
    console.log(error);
}).finally(() => console.log('the promise is either resolved or rejected'))

const promiseFive = new Promise(function (resolve, reject) {
    setTimeout(function () {
        let error = false;
        if (!error) {
            resolve({ username: 'javascript' })
        } else {
            reject('js went wrong')

        }
    }, 1000)
});

async function consumePromiseFive() {
    try {
        const response = await promiseFive
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}

consumePromiseFive()

async function getAllUsers(params) {
    try {
        const response = await fetch('')

        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.log("E: ", error);
    }
}

getAllUsers()

fetch().then((response) => {
    const data = response.json()
    return data
}).then((data) => {
    console.log(data);
}).catch((error) => {
    console.log(error);
})

/**
 * if we get HTTP error 404 from fetch() then it will be type of reolve and not reject. 
 */