/**
 * https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1
 * 
 * https://takeuforward.org/data-structure/g-34-dijkstras-algorithm-intuition-and-time-complexity-derivation/
 * 
 * 
 * Implementing Dijkstra Algorithm
 * Given a weighted, undirected and connected graph of V vertices and an adjacency list adj where adj[i] is a list of lists containing two integers where the first integer of each list j denotes there is edge between i and j , second integers corresponds to the weight of that  edge . You are given the source vertex S and You to Find the shortest distance of all the vertex's from the source vertex S. You have to return a list of integers denoting shortest distance between each node and Source vertex S.

 * Note: The Graph doesn't contain any negative weight cycle.

 * 

 * Example 1:

 * Input:
 * V = 2
 * adj [] = {{{1, 9}}, {{0, 9}}}
 * S = 0
 * Output:
 * 0 9
 * Explanation:

 * The source vertex is 0. Hence, the shortest 
 * distance of node 0 is 0 and the shortest 
 * distance from node 1 is 9.
 * 

 * Example 2:

 * Input:
 * V = 3, E = 3
 * adj = {{{1, 1}, {2, 6}}, {{2, 3}, {0, 1}}, {{1, 3}, {0, 6}}}
 * S = 2
 * Output:
 * 4 3 0
 * Explanation:

 * For nodes 2 to 0, we can follow the path-
 * 2-1-0. This has a distance of 1+3 = 4,
 * whereas the path 2-0 has a distance of 6. So,
 * the Shortest path from 2 to 0 is 4.
 * The shortest distance from 0 to 1 is 1 .
 * 

 * Your Task:
 * You don't need to read input or print anything. Your task is to complete the function dijkstra()  which takes the number of vertices V and an adjacency list adj as input parameters and Source vertex S returns a list of integers, where ith integer denotes the shortest distance of the ith node from the Source node. Here adj[i] contains a list of lists containing two integers where the first integer j denotes that there is an edge between i and j and the second integer w denotes that the weight between edge i and j is w.

 * 

 * Expected Time Complexity: O(V2).
 * Expected Auxiliary Space: O(V2).

 * 

 * Constraints:
 * 1 ≤ V ≤ 1000
 * 0 ≤ adj[i][j] ≤ 1000
 * 1 ≤ adj.size() ≤ [ (V*(V - 1)) / 2 ]
 * 0 ≤ S < V
 * 
 */
function dijkstra(V, adj, S) {
  // Create a set ds for storing the nodes as a pair {dist,node}
  // where dist is the distance from source to the node.
  // set stores the nodes in ascending order of the distances
  let st = new Set();

  // Initialising dist list with a large number to
  // indicate the nodes are unvisited initially.
  // This list contains distance from source to the nodes.
  let dist = new Array(V).fill(Number.MAX_SAFE_INTEGER);

  st.add([0, S]);

  // Source initialised with dist=0
  dist[S] = 0;

  // Now, erase the minimum distance node first from the set
  // and traverse for all its adjacent nodes.
  while (st.size > 0) {
    let it = Array.from(st)[0];
    let node = it[1];
    let dis = it[0];
    st.delete(it);

    // Check for all adjacent nodes of the erased
    // element whether the prev dist is larger than current or not.
    for (let i = 0; i < adj[node].length; i++) {
      let adjNode = adj[node][i][0];
      let edgW = adj[node][i][1];

      if (dis + edgW < dist[adjNode]) {
        // erase if it was visited previously at
        // a greater cost.
        if (dist[adjNode] !== Number.MAX_SAFE_INTEGER)
          st.delete([dist[adjNode], adjNode]);

        // If current distance is smaller,
        // push it into the queue
        dist[adjNode] = dis + edgW;
        st.add([dist[adjNode], adjNode]);
      }
    }
  }
  // Return the list containing shortest distances
  // from source to all the nodes.
  return dist;
}
