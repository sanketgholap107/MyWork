/**
 * the global fetch() method starts the process of fetching a resource from the network, returning a promise 
 * which is fullfilled once the response is available.
 */

/**
 * if we get HTTP error 404 from fetch() then it will be type of reolve and not reject. 
 */

/**
 * fetch() mechanism works in 2 parts :
 * 1st: memory storage (to store memory or space in variable)
 *     : - onfulfilled[] this is connected to resolve of promise
 *     : - onRejection[] this is connected to reject of promise
 *          
 * 2nd: web browser (API request handling)
 *      -this sends a network request, if network request is 
 *       successfull then it goes into onfulfilled[] array 
 *       and if request is unsuccessfull then it goes into 
 *       onRejection[], when error 404 occurs then it goes into fullfilled
 *       array bcoz after successfull request only it is showing us 404 error.
 */