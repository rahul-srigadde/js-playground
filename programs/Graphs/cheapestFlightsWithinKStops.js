/**
 * https://www.geeksforgeeks.org/problems/cheapest-flights-within-k-stops/1
 * Cheapest Flights Within K Stops
 * There are n cities and m edges connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from the city fromi to city toi with cost pricei.

 * You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.

 * Note: The price from city A to B may be different From the price from city B to A.

 * Example 1:
 * Input:
 * n = 4
 * flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]]
 * src = 0
 * dst = 3
 * k = 1
 * Output:
 * 700
 * Explanation:
 * The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
 * Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.

 * Constraint:
 * 1 <= n <= 100
 * 0 <= flights.length <= (n * (n - 1) / 2)
 * flights[i].length == 3
 * 0 <= fromi, toi < n
 * fromi != toi
 * 1 <= pricei <= 104
 * There will not be any multiple flights between the two cities.
 * 0 <= src, dst, k < n
 * src != dst
 */
class Solution {
  CheapestFLight(n, flights, src, dst, K) {
    // Create the adjacency list to depict airports and flights in
    // the form of a graph.
    let adj = Array.from({ length: n }, () => []);
    for (let flight of flights) {
      adj[flight[0]].push([flight[1], flight[2]]);
    }

    // Create a queue which stores the node and their distances from the
    // source in the form of {stops, {node, dist}} with 'stops' indicating
    // the no. of nodes between src and current node.
    let q = [];
    q.push([0, [src, 0]]);

    // Distance array to store the updated distances from the source.
    let dist = Array(n).fill(1e9);
    dist[src] = 0;

    // Iterate through the graph using a queue like in Dijkstra with
    // popping out the element with min stops first.
    while (q.length > 0) {
      let [stops, [node, cost]] = q.shift();

      // We stop the process as soon as the limit for the stops reaches.
      if (stops > K) continue;
      for (let [adjNode, edW] of adj[node]) {
        // We only update the queue if the new calculated dist is
        // less than the prev and the stops are also within limits.
        if (cost + edW < dist[adjNode] && stops <= K) {
          dist[adjNode] = cost + edW;
          q.push([stops + 1, [adjNode, cost + edW]]);
        }
      }
    }

    // If the destination node is unreachable return '-1'
    // else return the calculated dist from src to dst.
    return dist[dst] === 1e9 ? -1 : dist[dst];
  }
}
