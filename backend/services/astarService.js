function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function astar(gridSize, start, goal, obstacles) {
  const key = (x, y) => x + "," + y;

  const open = [{ ...start, g: 0, f: heuristic(start, goal) }];

  const visited = new Set();

  const parent = {};

  while (open.length) {
    open.sort((a, b) => a.f - b.f);

    const current = open.shift();

    if (current.x === goal.x && current.y === goal.y) {
      let path = [];
      let node = current;

      while (node) {
        path.push({ x: node.x, y: node.y });

        node = parent[key(node.x, node.y)];
      }

      return { path: path.reverse() };
    }

    visited.add(key(current.x, current.y));

    const moves = [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ];

    for (const m of moves) {
      const nx = current.x + m.x;
      const ny = current.y + m.y;

      if (nx < 0 || ny < 0 || nx >= gridSize || ny >= gridSize) continue;

      if (obstacles.some((o) => o.x === nx && o.y === ny)) continue;

      const k = key(nx, ny);

      if (visited.has(k)) continue;

      const g = current.g + 1;

      const node = {
        x: nx,
        y: ny,
        g,
        f: g + heuristic({ x: nx, y: ny }, goal),
      };

      parent[k] = current;

      open.push(node);
    }
  }

  return { path: [] };
}

module.exports = { astar };
