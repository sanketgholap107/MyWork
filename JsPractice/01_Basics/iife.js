// Immediately Invoked Function Expressions (IIFE)
// to avoid global scope pollution / global scope variables , we use IIFE.

// named IIFE
(function chai() {
    console.log(`DB CONNECTED`);
})();

// unnamed iife
((name) => {
    console.log(`DB CONNECTED BY ${name}`);
})(`Sanket`);