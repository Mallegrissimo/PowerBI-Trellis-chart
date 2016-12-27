/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */


/// <amd-dependency path='dimplsechart'>
/// <amd-dependency path='external/dimple.v2.3.0.min' name='dimple'>
/// <amd-dependency path='external/dimple.v2.3.0.min.js'  name='dimple'>
/// <amd-dependency path='external/testlib'>

module powerbi.extensibility.visual {
    /// <reference types="d3" />
    export class Visual implements IVisual {

        private svg: d3.Selection<SVGElement>;
        private ele: any;

        constructor(options: VisualConstructorOptions) {
            let ele = options.element;
            let svg = this.svg = d3.select(options.element)
                .append('svg').classed('trellis', true);
        }

        public update(options: VisualUpdateOptions) {
            let dataView = options.dataViews[0];
            debugger;
            loadTrellis(this.svg, dataView, options);

        }
    }
}