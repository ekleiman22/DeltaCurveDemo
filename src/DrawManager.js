import { glob } from './Global'
import { PointF } from './PointF'
import {
    getMiddlePoint, getDistance, getLineEquationByPoints,
    getLineWithCircleIntersection, pointBelongSegment} from './Utility'
export default class DrawManager {

    oneStepDrawing(stepNumber, current) {
        let g = glob();
        var c = document.getElementById(g.canvasId);
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        let mainTriangleVertices = this.drawEquilateralTriangle(g, ctx);
        let A = mainTriangleVertices[0]; //upper vertex
        let B = mainTriangleVertices[1];
        let C = mainTriangleVertices[2];
        let D = new PointF();
        let h = 0;
        let step = new PointF();
       
        let from = new PointF();
        let to = new PointF();
        let Against = new PointF();
        let oneThird = g.stepsCount / 3;

        D = getMiddlePoint(A, B);
        h = getDistance(C, D);
        if (stepNumber >= 1 && stepNumber <= oneThird) {
            from = A;
            to = B;
            Against = C;
            if (stepNumber == 1)
                current = getMiddlePoint(from, to);
        }
        if (stepNumber > oneThird && stepNumber <= 2 * oneThird) {
            from = C;
            to = A;
            Against = B;
            if (stepNumber == oneThird + 1)
                current = getMiddlePoint(from, to);
        }
        if (stepNumber > 2 * oneThird && stepNumber <= g.stepsCount) {
            from = B;
            to = C;
            Against = A;
            if (stepNumber == 2 * oneThird + 1)
                current = getMiddlePoint(from, to);
        }

        D = getMiddlePoint(from, to);
        
        let ax = from.X; let bx = to.X; let cx = Against.X;
        let ay = from.Y; let by = to.Y; let cy = Against.Y;
        let dx = D.X; let dy = D.Y;
        let coefs = getLineEquationByPoints(from, Against);

        //move D  to biggest value of ax and bx
        step = new PointF((bx - dx) / oneThird, (by - dy) / oneThird);
        this.drawText(mainTriangleVertices[0], "A", ctx);       
        this.drawText(mainTriangleVertices[1], "B", ctx);        
        this.drawText(mainTriangleVertices[2], "C", ctx);

        this.drawPoint(current, 4, ctx);
       let points = getLineWithCircleIntersection(coefs[0], coefs[1], coefs[2],
           current, h)

        //choose the point that belongs to AC
        let second = points[0];
        let middle = getMiddlePoint(Against, from);

        if (pointBelongSegment(second, Against, middle))        
            second = points[0];
        else
            second = points[1];       
        this.drawPoint(second, 4, ctx);
        this.DrawArcBetweenTwoPoints(current, second, h, ctx);
        this.DrawArcBetweenTwoPoints(current, second, h, ctx,true);
        current = new PointF(current.X + step.X, current.Y + step.Y);
        return current;
    }

    drawEquilateralTriangle(g, ctx) {
       let vertices =[];
        try {
            let upperVertex = new PointF(g.upperVertexX, g.upperVertexY);
            let side = g.triangleSideLength;
            let h = side * Math.sin(Math.PI/ 3);
            let leftBottomVertexX = upperVertex.X - side / 2; //because 30 degee angle
            let leftBottomVertexY = upperVertex.Y + h;
            let leftBottomVertex = new PointF(leftBottomVertexX, leftBottomVertexY);
            let rightBottomVertex = new PointF(leftBottomVertexX + side, leftBottomVertexY);

            this.drawLine(leftBottomVertex, upperVertex, ctx,g);
            this.drawLine(rightBottomVertex, upperVertex, ctx, g);
            this.drawLine(rightBottomVertex, leftBottomVertex, ctx, g);
            vertices = [ upperVertex, leftBottomVertex, rightBottomVertex ];
        }
        catch ( ex)
        {
            throw ex;
         }
         return vertices;
    }
    //Point from, Point to
    drawLine(from, to, ctx,g) {
        try {
            ctx.beginPath();
            ctx.lineWidth = g.LineWidth1;
            ctx.strokeStyle = g.LineColor1;
            //graphics.DrawLine(pen, from, to);            
            ctx.beginPath();
            ctx.moveTo(from.X,from.Y);
            ctx.lineTo(to.X, to.Y);
            ctx.stroke();
        }
        catch ( ex)
        {
            throw ex;
        }
    }
    //(Point A, string text
    drawText(A, text, ctx)
    {
        ctx.font = "15px Arial";
        ctx.strokeText(text, A.X, A.Y);
    }
    //Point A, int radius
    drawPoint( A,  radius,ctx)
    {
        ctx.beginPath();
        ctx.arc(A.X, A.Y, radius, 0, 2 * Math.PI, true);
        ctx.fill();
    }

    //(PointF a, PointF b, float radius, bool flip = false
    DrawArcBetweenTwoPoints( a,  b,
         radius,ctx,  flip = false) {
        if (flip) {
            let temp = b;
            b = a;
            a = temp;
        }

        // get distance components
        let x = b.X - a.X, y = b.Y - a.Y;
        // get orientation angle
        var θ = Math.atan2(y, x);
        // length between A and B
        var l = Math.sqrt(x * x + y * y);
        if (2 * radius >= l) {
            // find the sweep angle (actually half the sweep angle)
            var φ = Math.asin(l / (2 * radius));
            // triangle height from the chord to the center
            var h = radius * Math.cos(φ);
            // get center point. 
            // Use sin(θ)=y/l and cos(θ)=x/l
            let C = new PointF(
                (a.X + x / 2 - h * (y / l)),
                (a.Y + y / 2 + h * (x / l)));

            //graphics.DrawLine(Pens.DarkGray, C, a);
            //graphics.DrawLine(Pens.DarkGray, C, b);
            //DrawPoint(g, Brushes.Orange, C);

           

            // Draw arc based on square around center and start/sweep angles
            ctx.beginPath();
            let sAngle = θ - φ - Math.PI / 2;
            let eAngle = sAngle + 2 * φ;
            ctx.arc( C.X , C.Y , radius, sAngle, eAngle,false);
            ctx.stroke();
        }
    }
}