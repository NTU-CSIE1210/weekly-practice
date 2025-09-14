import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAsterisk, faCheck, faExclamation, faLink, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import BrowserOnly from '@docusaurus/BrowserOnly';

export function InnerLocalButton({name}) {
  const [toggle, setToggle] = useState(localStorage.getItem(`lb-${name}`))
  useEffect(() => {
    localStorage.setItem(`lb-${name}`, toggle)
    window.dispatchEvent(new Event('storage'))
  }, [toggle]);
  var icon = (<FontAwesomeIcon icon={faAsterisk} size="lg" />);
  if (toggle === "solved") {
    icon = (<FontAwesomeIcon icon={faCheck} size="lg" />);
  } else if (toggle === "in-progress") {
    icon = (<FontAwesomeIcon icon={faExclamation} size="lg" />);
  }
  return (<div className={`lb ${toggle||"none"}`} style={{cursor: 'pointer', userSelect: 'none'}} onClick={() => {
    if (toggle === null || toggle === undefined || toggle === "none") {
      setToggle("solved")
    } else if (toggle === "solved") {
      setToggle("in-progress")
    } else {
      setToggle("none")
    }
  }}>{icon}</div>)
}

export default function LocalButton({name}) {
  return (<BrowserOnly fallback={(<div>loading...</div>)}>
    {() => (<InnerLocalButton name={name} />)}
    </BrowserOnly>);
}
