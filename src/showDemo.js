import { glob } from './Global'
import { move } from './demoSlice'
export function Show_Demo_click_handler(dispatch, event)
{
    let g = glob();
    let stepsCount = g.stepsCount;
    callStep(1, stepsCount, g, dispatch);
}
const callStep = (i, movesCount, g, dispatch) => {
    if (i > movesCount) {
        const timer = setTimeout(
            () => lastStep(dispatch),
            1000);
        return;
    }
           
    dispatch(move(i))
    const timer = setTimeout(
        () => callStep(i, movesCount, g, dispatch),
        1000)
    i++;

    //return () => clearTimeout(timer);
}
const lastStep = (dispatch) => {
    dispatch(move(1));
    return;
}

export default Show_Demo_click_handler;