import classNames from 'classnames';
import './_Title.scss';
import { ComponentProps,ChangeEvent, FC, useState } from 'react';
import { useOnClickOutside } from '../../hooks';
import { Tooltip } from '../Tooltip';
  
type Props = ComponentProps<'div'> & {};
  
export const Title: FC<Props> = ({ className, ...props }) => {
  const [titleSize, setTitleSize] = useState(90);
  const [showSlider, setShowSlider] = useState(false);

  const baseClassName = 'c-title';
  const getClassName = () => classNames(baseClassName, className);
  const onClickOutsideRef = useOnClickOutside<HTMLDivElement>(()=>setShowSlider(false));

  const onChangeSlider = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target?.value || e.target?.innerText;
    setTitleSize(Number(value))
  }

  return (
    <div ref={onClickOutsideRef} onFocus={()=>setShowSlider(true)} className={getClassName()} {...props}>
      {showSlider && 
        <Tooltip>
          <input onChange={onChangeSlider} value={titleSize} type="range" min="50" max="120" />
          <div><span contentEditable onInput={onChangeSlider}>{titleSize}</span><span>px</span></div>
        </Tooltip>
      }
      <h1 style={{fontSize: titleSize}} contentEditable>Ceci est un titre</h1>
    </div>
  );
};