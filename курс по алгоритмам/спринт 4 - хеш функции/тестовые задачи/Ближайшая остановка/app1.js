const fs = require('fs');
let fileContent = fs.readFileSync('input.txt', 'utf8');

const dex = 10;
let count1 = 0;
let data1 = [];
let count2 = 0;
let data2 = [];
let minx = null;
let miny = null;
let maxx = null;
let maxy = null;
let delta = 20;

fileContent.split('\n').forEach((line, index) => {
    if (index === 0) {
        count1 = parseInt(line, dex);
    }
    if (index > 0 && index <= count1) {
        let point = line.split(' ').map(el => parseInt(el, dex));
        data1.push(point);
        if (minx === null || point[0] < minx) {
            minx = point[0];
        }
        if (maxx === null || point[0] > maxx) {
            maxx = point[0];
        }
        if (miny === null || point[1] < miny) {
            miny = point[1];
        }
        if (maxy === null || point[1] > maxy) {
            maxy = point[1];
        }
    }
    if (index === count1 + 1) {
        count2 = parseInt(line, dex);
        minx = minx - 2 * delta;
        maxx = maxx + 2 * delta;
        miny = miny - 2 * delta;
        maxy = maxy + 2 * delta;
    }
    if (index > count1 + 1 && index <= count1 + 1 + count2) {
        let point = line.split(' ').map(el => parseInt(el, dex));
        if (point[0] < minx || point[0] > maxx|| point[1] < miny || point[1] > maxy) {
            return;
        }
        data2.push({x: point[0] - minx, y: maxy - point[1], originalX: point[0], originalY: point[1], w: 0, h: 0});
    }
});

var quadtree = function(options)
{
	"use strict";

	var opts = {},
		tree,
		allItems = [];

	// constants for quadrants
	var TOP_LEFT = 'tl',
		TOP_RIGHT = 'tr',
		BOTTOM_LEFT = 'bl',
		BOTTOM_RIGHT = 'br';

	/**
	 * Init function is called on tree instantiation and clearing.
	 * It checks tree options and creates root node of the tree.
	 * @param {Object} options
	 */
	function init(options)
	{
		if (! ('top' in options) || ! ('left' in options) || ! ('bottom' in options) || ! ('right' in options)) {
			throw new Error('not enough init options');
		}
		opts = {
			top: options.top,
			left: options.left,
			bottom: options.bottom,
			right: options.right,
			max_per_cell: options.max_per_cell || 2,
			max_depth: options.max_depth || 4,
			debug_mode: options.debug_mode || false
		};

		tree = new Node(opts.top, opts.left, opts.bottom, opts.right, 0);
	}
	init(options);

	/**
	 * Main function for creating index nodes
	 * @constructor
	 * @param {number} top
	 * @param {number} left
	 * @param {number} bottom
	 * @param {number} right
	 * @param {number} depth - 0 for root node, every other node has depth as parent's + 1
	 */
	function Node(top, left, bottom, right, depth)
	{
		this.top = top;
		this.left = left;
		this.bottom = bottom;
		this.right = right;
		this.depth = depth;

		this.items = [];
		this.nodes = undefined;

		/**
		 * Checks if node can have point with such coordinates
		 * @param {number} x
		 * @param {number} y
		 * @returns {boolean}
		 */
		this.containsPoint = function containsPoint(x, y)
		{
			return pointIsInBounds(x, y, this.top, this.left, this.bottom, this.right);
		};

		/**
		 * Checks  if node can have some points from a given range
		 * @param {number} top
		 * @param {number} left
		 * @param {number} bottom
		 * @param {number} right
		 * @returns {boolean}
		 */
		this.containsRangePart = function containsRangePart(top, left, bottom, right)
		{
			return rangesIntersect(top, left, bottom, right, this.top, this.left, this.bottom, this.right);
		};

		/**
		 * It's used to insert yet another point into this node.
		 * It checks if node has to contain it itself or delegate to child nodes.
		 * @param {{x: (number), y: (number), i: (number)}} itemForIndex
		 * @returns {boolean}
		 */
		this.insert = function insert(itemForIndex)
		{

			// if this point is out of bounds, do nothing
			if (! this.containsPoint(itemForIndex.x, itemForIndex.y)) {
				return false;
			}
			// if we have nodes, delegate
			if (this.nodes)
			{
				var nodes = this.nodes;
				if (nodes[TOP_LEFT].insert(itemForIndex)) return true;
				if (nodes[TOP_RIGHT].insert(itemForIndex)) return true;
				if (nodes[BOTTOM_LEFT].insert(itemForIndex)) return true;
				if (nodes[BOTTOM_RIGHT].insert(itemForIndex)) return true;

				if (opts.debug_mode) {
					throw new Error('item was not inserted into any node: ' + itemAsString(itemForIndex));
				}
				return false;
			}
			// if this is a leaf node and we can add new items, add
			if (this.items.length < opts.max_per_cell || this.depth >= opts.max_depth)
			{
				this.items.push(itemForIndex);
				return true;
			}
			// otherwise, divide node and insert item again
			this.divide();
			return this.insert(itemForIndex);
		};

		/**
		 * If there's not enough space for another point in current node, it's becoming a parent of 4 child nodes
		 * and all it's items are moved to this nodes
		 * @returns {boolean}
		 */
		this.divide = function divide()
		{
			var nodes = this.nodes = {},
				halfWidth = (this.right - this.left) / 2,
				halfHeight = (this.bottom - this.top) / 2,
				debug = opts.debug_mode,
				resInsert;
			nodes[TOP_LEFT] = new Node(this.top, this.left, this.top + halfHeight, this.left + halfWidth, depth + 1);
			nodes[TOP_RIGHT] = new Node(this.top, this.left + halfWidth, this.top + halfHeight, this.right, depth + 1);
			nodes[BOTTOM_LEFT] = new Node(this.top + halfHeight, this.left, this.bottom, this.left + halfWidth, depth + 1);
			nodes[BOTTOM_RIGHT] = new Node(this.top + halfHeight, this.left + halfWidth, this.bottom, this.right, depth + 1);

			for (var i = 0, items = this.items, l = items.length; i < l; i ++) {
				resInsert = this.insert(items[i]);
				if (debug && ! resInsert) {
					throw new Error('Item not inserted while dividing: ' + itemAsString(items[i]));
				}
			}
			this.items = [];
			return true;
		};

		/**
		 * It's for retrieving data from index.
		 * It's duplicates aware.
		 * @param {number} top
		 * @param {number} left
		 * @param {number} bottom
		 * @param {number} right
		 * @param {Object} storeValidIndices - that is where valid index data will be stored to.
		 */
		this.queryRange = function queryRange(top, left, bottom, right, storeValidIndices)
		{
			// if out of bounds, do nothing
			if (! this.containsRangePart(top, left, bottom, right)) {
				return;
			}
			// if node has child nodes, delegate
			if (this.nodes)
			{
				var nodes = this.nodes;
				nodes[TOP_LEFT].queryRange(top, left, bottom, right, storeValidIndices);
				nodes[TOP_RIGHT].queryRange(top, left, bottom, right, storeValidIndices);
				nodes[BOTTOM_LEFT].queryRange(top, left, bottom, right, storeValidIndices);
				nodes[BOTTOM_RIGHT].queryRange(top, left, bottom, right, storeValidIndices);
			}
			// otherwise node has items, test each of them and push valid ones into given storage object
			if (this.items.length)
			{
				for (var i = 0, items = this.items, l = items.length, item; i < l; i ++)
				{
					item = items[i];
					if (pointIsInBounds(item.x, item.y, top, left, bottom, right)) {
						storeValidIndices[item.i] = true;
					}
				}
			}
			// if no items in leaf node, do nothing
		};
	}

	//-------- helpers

	/**
	 * Checks if point's coordinates are in specified range.
	 * It includes all edges, because we're filtering out duplicates later.
	 * @param {number} x - point's coordinate
	 * @param {number} y - point's coordinate
	 * @param {number} top - range's coordinate
	 * @param {number} left - range's coordinate
	 * @param {number} bottom - range's coordinate
	 * @param {number} right - range's coordinate
	 * @returns {boolean}
	 */
	function pointIsInBounds(x, y, top, left, bottom, right)
	{
		if (x >= left && x <= right && y >= top && y <= bottom) {
			return true;
		}
		return false;
	}

	/**
	 * Checks if range's intersects with specified range.
	 * It includes all edges, because we're filtering out duplicates later.
	 * @param {number} top
	 * @param {number} left
	 * @param {number} bottom
	 * @param {number} right
	 * @param {number} topRange
	 * @param {number} leftRange
	 * @param {number} bottomRange
	 * @param {number} rightRange
	 * @returns {boolean}
	 */
	function rangesIntersect(top, left, bottom, right, topRange, leftRange, bottomRange, rightRange)
	{
		if (left <= rightRange && right >= leftRange && top <= bottomRange && bottom >= topRange) {
			return true;
		}
		return false;
	}

	function isArray(item)
	{
		return Object.prototype.toString.apply(item) === '[object Array]';
	}

	function isNumber(num)
	{
		return typeof num === 'number';
	}

	/**
	 * It's for debugging purposes
	 * @param {Object} item
	 * @returns {string}
	 */
	function itemAsString(item)
	{
		if (! item) {
			return 'empty item';
		}
		return '{x: ' + item.x + ', y: ' + item.y + '}';
	}

	/**
	 * It's used to sort by closeness
	 * @param {{x: (number), y: (number)}} p1 - point 1
	 * @param {{x: (number), y: (number)}} p2 - point 2
	 * @returns {number} - distance between points
	 */
	function distancePow2(p1, p2)
	{
		return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
	}

	/**
	 * This function gets all real data by index data's ids.
	 * @param {Object} index - index data stored by real data's array id
	 * @param {{x: (number), y: (number)}} sortClosestTo - sorts all results by closeness to this coordinates
	 * @returns {Array}
	 */
	function itemsByIndex(index, sortClosestTo)
	{
		var items = [];
		for (var i in index)
		{
			if (index.hasOwnProperty(i)) {
				items.push(allItems[i]);
			}
		}

		if (sortClosestTo && sortClosestTo.x !== undefined && sortClosestTo.y !== undefined) {
			items.sort(function (a, b) {
				return distancePow2(a, sortClosestTo) < distancePow2(b, sortClosestTo) ? -1 : 1;
			});
		}

		return items;
	}

	/**
	 * This item's representation will be put into the index tree
	 * @param {Object} item
	 * @param {number} index
	 * @returns {{x: (number), y: (number), i: (number)}}
	 */
	function itemToIndex(item, index)
	{
		return {x: item.x, y: item.y, i: index};
	}

	/**
	 * Checks if item can be stored into the tree
	 * @param item
	 * @returns {boolean}
	 */
	function checkIsValid(item)
	{
		if (! ('x' in item) || ! ('y' in item))
		{
			if (opts.debug_mode) {
				throw new Error('invalid item ' + (item && itemAsString(item)));
			}
			return false;
		}
		return true;
	}

	/**
	 * Public methods to work with indexed quadtree
	 */
	return {
		/**
		 * Inserts items with coordinattes into the index tree
		 * @param {Object|Array} item - it could be either object with params defining point or array of that objects
		 *
		 * point params are:
		 * {
		 *      x: center x coordinate,
		 *      y: center x coordinate
		 * }
		 */
		insert: function _insert(item)
		{
			if (! tree || (! 'top' in opts)) {
				throw new Error('Quadtree is not initialized');
			}

			var debug = opts.debug_mode,
				res;

			if (isArray(item))
			{
				var totalLengthBefore = allItems.length,
					l = item.length,
					cur;
				if (l > 0 && checkIsValid(item[0]))
				{
					for (var i = 0; i < l; i ++)
					{
						cur = item[i];
						allItems.push(cur);
						res = tree.insert(itemToIndex(cur, totalLengthBefore + i));
						if (debug && ! res) {
							throw new Error('1Item not inserted (' + i + '): ' + itemAsString(cur));
						}
					}
				}
			}
			else
			{
				if (checkIsValid(item))
				{
					allItems.push(item);
					res = tree.insert(itemToIndex(item, allItems.length - 1));
					if (debug && ! res) {
						throw new Error('2Item not inserted: ' + itemAsString(item));
					}
				}
			}
		},
		/**
		 * Get all points in a range with coordinates
		 * @param {number} top
		 * @param {number} left
		 * @param {number} bottom
		 * @param {number} right
		 * @param {boolean} sortByCloseness
		 * @returns {Array}
		 */
		queryRange: function _queryRange(top, left, bottom, right, sortByCloseness)
		{
			if (! isNumber(top) || ! isNumber(left) || ! isNumber(bottom) || ! isNumber(right))
			{
				if (opts.debug_mode) {
					throw new Error('Invalid arguments for queryRange');
				}
				return [];
			}
			var index = {};
			tree.queryRange(top, left, bottom, right, index);
			return itemsByIndex(index, sortByCloseness && {x: (left + right) / 2, y: (top + bottom) / 2});
		},
		/**
		 * Get all points in a range by center coordinates, width and height
		 * @param {number} x - center x
		 * @param {number} y - center y
		 * @param {number} w - width
		 * @param {number} h - height
		 * @param {boolean} sortByCloseness
		 * @returns {Array}
		 */
		queryRangeByCenter: function _queryRangeByCenter(x, y, w, h, sortByCloseness)
		{
			if (! isNumber(x) || ! isNumber(y) || ! isNumber(w) || ! isNumber(h))
			{
				if (opts.debug_mode) {
					throw new Error('Invalid arguments for queryRangeCenter');
				}
				return [];
			}
			var index = {};
			tree.queryRange(y - h / 2, x - w / 2, y + h / 2, x + w / 2, index);
			return itemsByIndex(index, sortByCloseness && {x: x, y: y});
		},
		/**
		 * Get all points in a range represented by object with center coordinates, width and height
		 * @param {{x: (number), y: (number), w: (number), h: (number)}} obj
		 * @param {boolean} sortByCloseness
		 * @returns {Array}
		 */
		queryContainedBy: function _queryContainedBy(obj, sortByCloseness)
		{
			if (! obj || ! isNumber(obj.x) || ! isNumber(obj.y) || ! isNumber(obj.w) || ! isNumber(obj.h))
			{
				if (opts.debug_mode) {
					throw new Error('Invalid arguments for queryContainedBy');
				}
				return [];
			}
			var index = {};
			tree.queryRange(obj.y - obj.h / 2, obj.x - obj.w / 2, obj.y + obj.h / 2, obj.x + obj.w / 2, index);
			return itemsByIndex(index, sortByCloseness && {x: obj.x, y: obj.y});
		},
		/**
		 * Clears index tree
		 */
		clear: function _clear()
		{
			tree.items = [];
			tree.nodes = undefined;
			init(opts);
		}
	}
};


var options = {
    top: 0,
    left: 0,
    bottom: maxy - miny,
    right: maxx - minx,
    max_depth: 100000000,
    max_per_cell: 10000000,
    debug_mode: true
  };
var tree = quadtree(options);
tree.insert(data2);

let max = 0;
let findIndex = 0;

for (let i = 0; i < data1.length; i++) {
    let items = tree.queryContainedBy({x: data1[i][0] - minx, y: maxy - data1[i][1], h: delta, w: delta});
    // console.log(data1[i], {items})
    if (items.length > max) {
        // console.log(i)
        max = items.length;
        findIndex = i;
        if (max === data2.length) {
            break;
        }
    }
}



fs.writeFileSync('output.txt', findIndex + 1);