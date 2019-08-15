console.log('In js file');

// fetch('http://puzzle.mead.io/puzzle')
//     .then((response) => {
//         response.json().then((data) => {
//             console.log(data);
//         });
//     });
//
// fetch('http://localhost:3000/weather?address=boston')
//     .then((response) => {
//         response.json().then((data) => {
//             if (data.error) {
//                 console.log(data.error);
//             } else {
//                 console.log(data);
//             }
//         })
//     });

const weatherForm = document.querySelector('form');
const searchElement = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Submitting..');

    messageOne.textContent = 'Loading..';
    messageTwo.textContent = '';


    fetch('/weather?address='+searchElement.value)
        .then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error);
                    messageOne.textContent = data.error;
                } else {
                    console.log(data);
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast.message;
                }
            })
        });
});
