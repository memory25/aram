import promoList from './promoList';

function randomSort(array) {
  const promoteArr = [ ...array ].sort(() => Math.random() - 0.5);
  const removeDupli = [ ...new Set(promoteArr) ];

  return removeDupli;
}

export default function calcGroup({ pool = [], count = 20, canDupli = false }) {
  let blue = [];
  let red = [];

  const isPoolEmpty = pool.length === 0;
  const _pool = isPoolEmpty ? [] : [ ...pool, ...promoList ];
  if (canDupli) {
    const randomPool1 = randomSort(_pool);
    const randomPool2 = randomSort(_pool);

    blue = randomPool1.splice(0, count);
    red = randomPool2.splice(0, count);
  }
  else {
    const randomPool = randomSort(_pool);

    blue = randomPool.splice(0, count);
    red = randomPool.splice(0, count);
  }

  return {
    blue, red,
  };
}
