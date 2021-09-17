import React, { useState } from 'react';
import { champTable, champCn2En } from './appConst';

import Button from './button';
import Darkmode from './darkmode';

import calcGroup from './classification';
import lottery from './lottery';


const champList = Object.keys(champTable).sort();


export default function App(props) {
  // console.log(champTable, champCn2En);
  // console.log(champList);
  const arr = [];
  champList.forEach((n) => {
    arr.push({
      [n]: champTable[n].championName,
    });
  });

  const [ restChampList, setRestChampList ] = useState(champList);
  const [ banList, setBanList ] = useState([]);
  const [ lotteryList, setLotteryList ] = useState([]);

  const [ grp, setGrp ] = useState(() => calcGroup({
    'pool': [],
  }));

  const [ dupli, setDupli ] = useState(true);
  const [ num, setNum ] = useState(5);
  const [ cube, setCube ] = useState(3);
  const [ ban, setBan ] = useState('');

  /* const mulSet = new Set();
  const blueSet = new Set(grp.blue);
  grp.red.forEach((n) => {
    if (blueSet.has(n)) {
      mulSet.add(n);
    }
  }); */


  return (
    <>
      <Darkmode />
      <div className='rule font-effect-emboss'>
        <div className='option'>
          <label htmlFor='dupli'>雙方可重複</label>
          <input
            id='dupli'
            type='checkbox'
            checked={dupli}
            onChange={(e) => {
              setDupli(e.target.checked);
            }}
          />
        </div>

        <div className='option'>
          <label htmlFor='number'>人數</label>
          <select
            value={num}
            onChange={(e) => {
              setNum(e.target.value);
            }}
            name=''
            id='number'
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </select>
        </div>

        <div className='option'>
          <label htmlFor='cube'>骰子數</label>
          <select
            value={cube}
            onChange={(e) => {
              setCube(e.target.value);
            }}
            name=''
            id='cube'
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
        </div>

        <div className='option'>
          <span>Ban</span>
          <input
            list='banList'
            name='banList'
            value={ban}
            onChange={(e) => {
              setBan(e.target.value);
            }}
          />
          <datalist id='banList'>{restChampList.map((name) => <option key={name} value={name}>{champTable[name].championName}</option>)}</datalist>

          <Button
            text='新增'
            onClick={() => {
              const isExist = !!(champCn2En[ban] || champTable[ban]);
              if (isExist) {
                const targetName = champCn2En[ban] || ban;
                setBanList((pre) => [ ...new Set(pre).add(targetName) ]);
                setBan('');
                setRestChampList((pre) => {
                  const _set = new Set(pre);
                  _set.delete(targetName);

                  return [ ..._set ].sort();
                });
                setGrp(calcGroup({ 'pool': [] }));
                setLotteryList([]);
              }
            }}
          />
        </div>
        <Button
          text='產生'
          onClick={() => {
            setGrp(calcGroup({
              'pool': restChampList,
              'canDupli': dupli,
              'count': num * (Number(cube) + 1),
            }));
            setLotteryList(lottery());
          }}
        />
        <div className='lottery font-effect-fire-animation'>
          {lotteryList.length !== 0 && (
            <>
              <span>中大獎請自選</span>
              {lotteryList.map((src) => <img key={src} src={src} alt='' />)}
            </>
          )}
        </div>
      </div>

      <div className='classification font-effect-3d'>
        <div className='blue'>
          <span className='darkmodeReverse' style={{ 'flex': '0 0 100%', 'background': 'blue', 'color': '#fff' }}>Blue</span>
          {grp.blue.map((name) => (
            <div key={name}>
              <div className='champIcon' style={{ 'backgroundPosition': `0 ${champTable[name].idx * -50}px` }} />
            </div>
          ))}
        </div>

        <div className='ban'>
          <span className='darkmodeReverse' style={{ 'flex': '0 0 100%', 'background': 'black', 'color': '#fff' }}>Ban</span>
          {banList.map((name) => (
            <div
              key={name}
              tabIndex='-1'
              role='button'
              onClick={() => {
                setBanList((pre) => {
                  const _set = new Set(pre);
                  _set.delete(name);

                  return [ ..._set ];
                });
                setRestChampList((pre) => {
                  const _set = new Set(pre);
                  _set.add(name);

                  return [ ..._set ].sort();
                });
                setGrp(calcGroup({ 'pool': [] }));
                setLotteryList([]);
              }}
            >
              <div className='champIcon' style={{ 'backgroundPosition': `0 ${champTable[name].idx * -50}px` }} />
            </div>
          ))}
        </div>

        <div className='red'>
          <span className='darkmodeReverse' style={{ 'flex': '0 0 100%', 'background': 'red', 'color': '#fff' }}>Red</span>
          {grp.red.map((name) => (
            <div key={name}>
              <div className='champIcon' style={{ 'backgroundPosition': `0 ${champTable[name].idx * -50}px` }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
