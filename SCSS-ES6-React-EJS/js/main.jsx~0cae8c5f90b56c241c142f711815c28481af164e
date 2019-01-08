/* babel (ES6) / jQuery test */
import { RandomGenerator } from './functions';
import * as constants from './constants';

window.onload = function() {

    const outputParagraph = $('#outputParagraph');

    const outputRandomInt = () => {
        outputParagraph.text(RandomGenerator.randomInteger());
    };

    const outputRandomRange = () => {
        outputParagraph.text(RandomGenerator.randomRange(1, 500));
    };

    const buttonRndInt = $('#randomInt');
    const buttonRndRange = document.querySelector('#randomRange');

    buttonRndInt.click(outputRandomInt);
    buttonRndRange.addEventListener('click', outputRandomRange);

    console.log(constants);

};



/* react.js test */
let elem = document.getElementById('root');

function MyApp() {
    return (
        <div>
            <h1>react.js works!</h1>
        </div>
    );
}

ReactDOM.render(
  <MyApp />,
  elem
);
