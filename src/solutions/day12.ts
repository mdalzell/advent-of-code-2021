import { readInput } from '../shared/io';

type Node = {
  key: string;
  edges: string[];
};

type Graph = {
  [key: string]: Node;
};

const addEdgeToGraph = (graph: Graph, node1: string, node2: string) => {
  if (node1 in graph) {
    graph[node1].edges.push(node2);
  } else {
    graph[node1] = {
      key: node1,
      edges: [node2],
    };
  }
};

const readInputToGraph = (textFileName: string) => {
  const data = readInput(`input/${textFileName}.txt`);
  const graph: Graph = {};

  for (const line of data) {
    const [key1, key2] = line.split('-');
    addEdgeToGraph(graph, key1, key2);
    addEdgeToGraph(graph, key2, key1);
  }

  return graph;
};

const dfs = (graph: Graph, node: string, path: string, allowSingleDuplicate: boolean): string[] => {
  let paths = [];
  if (node === 'end') {
    return [path];
  }

  for (const edge of graph[node].edges) {
    const currentPath = path + `,${edge}`;
    if (edge === edge.toUpperCase() || !path.includes(edge)) {
      paths.push(...dfs(graph, edge, currentPath, allowSingleDuplicate));
    } else if (allowSingleDuplicate && !['start', 'end'].includes(edge)) {
      paths.push(...dfs(graph, edge, currentPath, false));
    }
  }

  return paths;
};

const day12 = (allowSingleDuplicate: boolean) => {
  const graph = readInputToGraph('day12');
  let paths = dfs(graph, 'start', 'start', allowSingleDuplicate);

  return paths.length;
};

console.log('Day 12 - Part 1', day12(false));
console.log('Day 12 - Part 2', day12(true));
