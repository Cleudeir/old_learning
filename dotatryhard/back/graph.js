import Ranking from './math/Ranking';

export default async function Graph() {
  async function pull(url, parameter) {
    const result = await fetch(url, parameter)
      .then((resp) => resp.json())
      .then((resp) => resp)
      .catch((err) => { console.log(err.message); return []; });
    return result;
  }

  // Media
  const { dataAvg, dataAvgAll } = await pull(
    `${process.env.url}/api/database/read`,
    {
      method: 'POST',
      body: JSON.stringify(
        {
          body: 'avg', country: 0, min: 10,
        },
      ),
    },
  );
  if (!dataAvg || !dataAvgAll) {
    return {
      status: 500,
      message: 'DATABASE OFFLINE',
      data: null,
    };
  }
  console.log('dataAvg: ', dataAvg.length);
  console.log('dataAvgAll: ', ((dataAvgAll.win / dataAvgAll.matches) * 100).toFixed(2), '%');
  //---------------------------------------------------
  const ranked = await Ranking({ dataAvg, dataAvgAll });
  //---------------------------------------------------
  const order = ranked.sort((a, b) => {
    if (a.ranking > b.ranking) return -1;
    return a.ranking < b.ranking ? 1 : 0;
  });
  const result = order.map(
    (x, i) => { const obj = { ...x, id: (i + 1) }; return obj; },
  );

  return {
    status: 200,
    message: 'Tudo ocorreu bem',
    data: result,
  };
}
