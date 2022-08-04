import { glob } from './Global'
import { useSelector, useDispatch } from 'react-redux'
import Show_Demo_click_handler from './showDemo'
function GameField() {
    //It works after createSlice 
    const dispatch = useDispatch();
    let g = glob();
    var c = document.getElementById("btnDraw");
    let doClick =  (event) => Show_Demo_click_handler(dispatch, event);
    c.addEventListener('mousedown', doClick);
}
export default GameField;