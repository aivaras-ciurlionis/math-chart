/**
 * Main class that defines all control funtions for a chart.
 *
 * ### Example
 * <pre>
 * import { MatchChart } from 'math-chart'
 * let chart = new MatchChart()
 * chart.setChartContainer('elementId')
 * </pre>
 */
class MathChart {
  containerId: string;
  functions: any[] = [];
  /**
   * Sets a parent container where the chart will be drawn
   * @param containerId A container element (defined with html id) to draw a chart in
   */
  setChartContainer(containerId: string) {
    this.containerId = containerId;
    console.log(`Added container: ${containerId}`);
  }

  /**
   * Append a function to a chart.
   * @param functionExpression A function to draw, for example x^2+4
   */
  addFunction(functionExpression: string) {
    this.functions.push(functionExpression);
    console.log(`Added function: ${functionExpression}`);
  }

}

export { MathChart };
