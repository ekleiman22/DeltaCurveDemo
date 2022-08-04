import { PointF } from './PointF'
import { glob } from './Global'
//(Point A, Point B, out double[] coefs
 export function getLineEquationByPoints( A,  B)
{
    let coefs = [];
    try {
        let x1 = A.X; let y1 = A.Y;
        let x2 = B.X; let y2 = B.Y;
        let a = x2 - x1; let b = y2 - y1; //vector collinear to the line
        //the line has equation -bx+ay+c=0
        //-b*x1+a*y1+c=0
        let c = b * x1 - a * y1;
        coefs[0] = -b; coefs[1] = a; coefs[2] = c;
        let d = Math.max(Math.abs(coefs[0]), Math.abs(coefs[1]));
        for (let i = 0; i < 3; i++)
        {
            coefs[i] = coefs[i] / d;
        }
    }
    catch ( ex)
    {
        throw ex;
     }
     return coefs;
}

//Point A, Point B
export function getDistance( A,  B)
{
    let d = Math.sqrt((B.X - A.X) * (B.X - A.X) + (B.Y - A.Y) * (B.Y - A.Y));
    return d;
}

//double a, double b, double c
 function getSquareEquationRoots( a,  b,  c)
{
    let roots = [];
    try {
        let sqdelta = Math.sqrt(b * b - 4 * a * c);

        roots[0] = (-b + sqdelta) / (2 * a);
        roots[1] = (-b - sqdelta) / (2 * a);
    }
    catch (ex )
    {
        throw ex;
    }
    return roots;

}

//double A, double B, double C,Point center, double radius, return PointF[]
 export function getLineWithCircleIntersection( A,  B,  C,
      center,  radius)
{
     let result = []; //new PointF[2];
    try {
        let x0 = center.X;
        let y0 = center.Y;
        let a = A * A + B * B;
        let b = 2 * (A * C + A * B * y0 - B * B * x0);
        let c = C * C + 2 * B * C * y0 - B * B * (radius * radius - x0 * x0 - y0 * y0);
        let roots = getSquareEquationRoots(a, b, c);
        let x1 = roots[0];
        let y1 = -((A * x1 + C) / B);
        let x2 = roots[1];
        let y2 = -((A * x2 + C) / B);;
        result[0] = new PointF(x1, y1);
        result[1] = new PointF(x2, y2);
    }
    catch ( ex)
    {
        throw ex;
    }
    return result;
}

//PointF A, Point segBegin, Point segEnd
//return bool
export function pointBelongSegment( A,  segBegin,  segEnd)
{
    let result = true;

     let ax = A.X; let bx = segBegin.X; let cx = segEnd.X;
     let ay = A.Y; let by = segBegin.Y; let cy = segEnd.Y;
     let u1 = changeByPrecision(ax - bx);
     let u2 = changeByPrecision(cx - ax);
     let v1 = changeByPrecision(ay - by);
     let v2 = changeByPrecision(cy - ay);
    result = u1 * u2 >= 0 && v1 * v2 >= 0;
   
    return result;
}
function changeByPrecision( a)
{
    let g = glob();
    let precision = g.precision;
    let result = a;
    if (Math.abs(a) < precision)
        result = 0;
    return result;
}
//Point A, Point B, return Point
export function getMiddlePoint( A,  B)
{
    let m1 = (A.X + B.X) / 2;
    let m2 = (A.Y + B.Y) / 2;
    let D = new PointF(m1, m2);
    return D;
}