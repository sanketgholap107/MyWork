/**
 * Closure gives you access to an outer function's 
 * scope from an inner function.
 * In javascript, closures are created everytime a function 
 * is created, at funciton creation time.
 * 
    whenever we return a function , js does not 
    return only that function's scope, it returns
    the whole lexical scope of that function, 
    for eg:
        function makeFunc(){
            const name = "adkdjbas"
            function displayName(){
                console.log(Name);
            }
            
            return displayName;
        }

        const myFunc = makeFunc();
        myFunc()

        so what most of the people will 
        think here is , when makeFunc() will
        be called its global excution context is getting created and
        after its execution it will be out of GEC,
        so displayName() function wont be returned properly 
        means basically it will give error, but this isn't correct ,
        as the displayName() funciton is getting returned so 
        it will be having lexical scope with outer function(it is returning
        its lexical scope), means even
        after the parent function is 
        getting out from call stack , child function will be having 
        access of variables of parent funciton, so it will print "Mozilla" here!

        REAL LIFE EXAMPLE:

        function clickHandler(color){
            // document.body.style.backgroundColor = `{color}` // this wont work properly 
            
            return function(){
                document.body.style.backgroundColor = `{color}`
            }
        }

        document.getElementById('orange').onClick = clickHandler("orange")
        document.getElementById('green').onClick = clickHandler("green")
 * 
 */

/**
 * Lexical SCOPING IS NOTHING BUT 
 * child function is having access of all the 
 * variables that are present in parent funciton.
 * example:
 *      function outer(){
 *          let username = "hitesh"
 *          console.log("OUTER", secret) //error
 *          function inner(){
 *              let secret = 351;
 *              console.log("inner",username)//success
 *          }
 * 
 *          function innerTwo(){
 *              console.log("secret",secret)//error
 *          }
 *          inner()
 *          innerTwo()
 *      }
 *      outer()
 *      console.log("too outer", username)  //error
 */