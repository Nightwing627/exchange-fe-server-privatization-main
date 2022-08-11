/* eslint no-restricted-imports: ["error", "fs"] */
import webworkerMap from '@/assets/js/webworker-map';

let futureWorkers = null;

webworkerMap.baseUrl = process.env.BASE_URL;

function futureWorker() {
  if (!futureWorkers) {
    futureWorkers = new Worker(`/static/web-worker/${webworkerMap.futureWebsocket}?fileMap=${JSON.stringify(webworkerMap)}`);
  }
  return futureWorkers;
}

export default futureWorker;
