"use strict";  //treat all JS code as newer version.

const accountId = 22;
let accountEmail = "sanketgholap@gmail.com";
var accountName = "sanket107";
// accountStatus = "opened";
//constant variables always remain same , they cant be changed !
// accountId = 55;


accountEmail = "Jodx@email.com";
accountName = "Jodx";
// accountStatus = "Closed";

// console.log(accountId);
// console.table([accountId, accountEmail, accountName]);

// prefer not to use "var", Because of the issue in Block Scope and Functional Scope.

// if we decalre a variable but dont assign a value to it , then it will be undefined. eg:
let account;
// console.table([accountId, accountEmail, accountName, account]);

/*
    datatypes in javascript

    Primitive Datatypes : 
    number
    string 
    bigint
    boolean
    undefined     // typeof undefined = undefined
    null          //typeof null = object
    
   ! Primitive Datatypes : 
    Object
*/

let score = "33abc";

// console.log(typeof (score));

let isNumber = Number(score)
// console.log(isNumber);
/**
 * for 
 * "33" => string
 * "33abc" => NaN Not a Number
 * null => 0
 * true => 1 , false => 0
*/

let isLoggedIn = "awdjkas"

let isBoolean = Boolean(isLoggedIn);
console.log(isBoolean);

/**
 * for 
 * 1 => true
 * "" => false
 * 0 => false
 * "dkjhasd" => true
*/

let someNumber = 33
let stringNumber = String(someNumber);
console.log(stringNumber);
console.log(typeof stringNumber);

// javascript internally converts string to a number while comparing
// comparison operators e.g > , < , != >= , <= and equality check i.e ==  works differently, comparison operators converts null into a number i.e 0 then compares.