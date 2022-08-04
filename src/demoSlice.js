import { createSlice } from '@reduxjs/toolkit'
import { glob } from './Global'
import DrawManager from './DrawManager'
import { PointF } from './PointF'

const oneStepDrawing = (i,P) =>
{
    const drawman = new DrawManager();
    let current = drawman.oneStepDrawing(i,P);
    return current;
}
const getChord = () =>
{
    return 0;
}
export const demoSlice = createSlice({
    name: 'demo',
    initialState: {
        stepNumber: 1,
        chordLength: getChord(),
        currentX: 0,
        currentY:0 //current moving point
    },
    reducers: {
        move: (state, action) =>
        {
            let i = action.payload;
            let Q = new PointF(state.currentX, state.currentY);
            let P = oneStepDrawing(i, Q);
            state.currentX = P.X;
            state.currentY = P.Y;
        }
    }
}
)
export const { move } = demoSlice.actions

export default demoSlice.reducer