/**
 * Result of a single function evaluation at value x
 */
class FunctionStepEvaluationResult {

    constructor(x: number, y: number, defined: boolean) {
        this.x = x;
        this.y = y;
        this.isDefined = defined;
    }

    x: number;
    y: number;
    /**
     * Is function result defined?
     */
    isDefined: boolean;
};

export default FunctionStepEvaluationResult;