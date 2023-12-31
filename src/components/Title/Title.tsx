import classNames from 'classnames';
import './_Title.scss';
import { ComponentProps,ChangeEvent, FC, useState } from 'react';
import { useOnClickOutside } from '../../hooks';
import { Tooltip } from '../Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { autoUpdate, useFloating, offset } from '@floating-ui/react';
import { mergeRefs } from '../../utils';
  
type Props = ComponentProps<'div'> & {};
  
export const Title: FC<Props> = ({ className, ...props }) => {
  const [titleSize, setTitleSize] = useState(90);
  const [showSlider, setShowSlider] = useState(false);
  const [showTitle, setShowTitle] = useState(true);

  const baseClassName = 'c-title';
  const getClassName = () => classNames(baseClassName, className);
  const onClickOutsideRef = useOnClickOutside<HTMLDivElement>(()=>setShowSlider(false));
  const {refs, floatingStyles} = useFloating({
    whileElementsMounted: autoUpdate,
    middleware: [offset(-24)],
  });

  const onChangeSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value || e.target?.innerText;
    setTitleSize(Number(value))
  }
  
  return (
    <div ref={mergeRefs([onClickOutsideRef, refs.setReference])} className={getClassName()} {...props}>
      {!showTitle && 
        <div className="showTitle">
          <button onClick={()=>setShowTitle(true)}><FontAwesomeIcon icon={faEye} /> Afficher le titre</button>
        </div>
      }

      {showSlider && 
        <Tooltip style={floatingStyles} ref={refs.setFloating}>
          <input onChange={onChangeSlider} value={titleSize} type="range" min="50" max="120" />
          <div><span contentEditable onInput={onChangeSlider}>{titleSize}</span><span>px</span></div>
          <button onClick={()=>{setShowTitle(false); setShowSlider(false)}}><FontAwesomeIcon icon={faEyeSlash} /></button>
        </Tooltip>
      }
      {showTitle && 
        <div className='c-title__text'>
          <h1 onFocus={()=>setShowSlider(true)} style={{fontSize: titleSize}} contentEditable>Ceci est un titre</h1>
          <h2 contentEditable>par Michel Michaud</h2>
        </div>
      }
    </div>
  );
};