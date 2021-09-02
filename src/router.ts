export default class Router {
  constructor(name: string) {
  }

  routeTo(event: PopStateEvent) {
    console.log(event);
    const addr = window.location;
    console.log(addr);
  }

  route(linkAddress: string) {
    const url: URL = new URL(linkAddress);
    const pagePart: string = url.hash;
    const destinationTitle: string = pagePart.replace(/^#\/page\//, '');

    console.log(`"${destinationTitle}"`);
  }
}
