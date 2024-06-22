export default class Router {
  routes: {};

  constructor(name: string) {
    this.routes = {};
  }

  routeTo(event: PopStateEvent) {
    const addr = window.location;
    const pagePart: string = addr.hash;
    const matching: string[] | null = pagePart.match(/^#\/(.*?)\//);

    console.log('routing:', addr, 'part:', pagePart, 'matching', matching);
    console.log('routes', this.routes);
    if (matching) {
      const action = matching[1];

      if (this.routes[action]) {
        this.routes[action]();
      }
    }
  }

  route(prefix: string, callback: () => void) {
    console.log('addingRoute', prefix);
    this.routes[prefix] = callback;
  }
}
