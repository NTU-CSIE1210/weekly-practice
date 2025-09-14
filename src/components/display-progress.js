import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faCheck, faExclamation, faLink, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import BrowserOnly from '@docusaurus/BrowserOnly';

export function InnerDisplayProgress({names}) {
  const getProgress = (names) => {
    return names.map((name) => `lb-${name}`).map((key) => localStorage.getItem(key)||"none")
  }
  const getFA = (v) => {
    var icon = (<FontAwesomeIcon icon={faAsterisk}  />);
    if (v === "solved") {
      icon = (<FontAwesomeIcon icon={faCheck}  />);
    } else if (v === "in-progress") {
      icon = (<FontAwesomeIcon icon={faExclamation}  />);
    }
    return icon;
  }
  const [state, setState] = useState(getProgress(names))
  const total = state.length;
  const solved = state.filter((v) => v === "solved").length;
  const percent = total > 0 ? Math.round((solved / total) * 100) : 0;
  const squares = state.map((v, i) => (<div className={`sq ${v||"none"}`} key={i}><div className='sq-inner'>{getFA(v)}</div></div>))
  useEffect(() => {
    const handleStorage = () => {
      // Place for a function responsible for
      // pulling and displaying local storage data
      setState(getProgress(names))
    }
  
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])
  return (<div>
          <div className="sq-outer">{squares}</div>
          <div className="progress-summary">✅ 已完成：{solved} / {total}（{percent}%）</div>
          </div>);
}

export default function DisplayProgress({names}) {
  return (<BrowserOnly fallback={(<div>loading...</div>)}>
    {() => (<InnerDisplayProgress names={names} />)}
  </BrowserOnly>);
}

