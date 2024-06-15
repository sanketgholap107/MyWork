document.getElementById('').onclick(function () {
    alert("");
})

document.getElementById('').addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.target.parentNode);
    console.log(e.target.tagName);
    if(e.target.tagName === 'IMG'){
        let removeIt = e.target.parentNode
        removeIt.remove();
        alert(" ");
    }
}, false)  //default false, this is also known as event bubbling.

/**
 * Scenario: there are two events on browser , one is attached to outer element
 *           and another is attached to inner element.
 * 
 * Event Propogation: e.stopPropogation() is used to stop the propogation.
 * 1.event bubbling: (false) : it goes from inside to outside. 
 *          eg. inner element will get triggered first.
 * 2.event capturing: (true): it goes from outside to inside.
 *          eg. outer element will get triggered first then inner element will get trigger.
 */         

// type, timestamp, defaultPrevented
// target, toElement, srcElement, currentTarget.
//clientX, clientY, screenX, screenY
// altkey, ctrlkey, shiftkey, keyCode
// attachEvent
// jQuery-on



