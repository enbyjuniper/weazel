import classNames from 'classnames';
import './_Header.scss';
import { ComponentProps,ChangeEvent, FC, useState } from 'react';
import { useOnClickOutside } from '../../hooks';
import { Tooltip } from '../Tooltip';
import { autoUpdate, useFloating } from '@floating-ui/react';
import { mergeRefs } from '../../utils';
 
type Props = ComponentProps<'div'> & {
  date: string;
};
  
export const Header: FC<Props> = ({ className, date, ...props }) => {
  const [headerImage, setHeaderImage] = useState('main');
  const [showSlider, setShowDropdown] = useState(false);

  const baseClassName = 'c-header';
  const getClassName = () => classNames(baseClassName, className);
  const onClickOutsideRef = useOnClickOutside<HTMLDivElement>(()=>setShowDropdown(false));
  const {refs, floatingStyles} = useFloating({
    whileElementsMounted: autoUpdate,
  });
  
  console.log(date);
  
  const d = new Date(date.replace(/-/g, '/')).toLocaleDateString("fr-Ca").replace(/-/g, '.');

  return (
    <header ref={mergeRefs([onClickOutsideRef, refs.setReference])} onClick={()=>setShowDropdown(true)} className={getClassName()}>
      <div className="c-header__top">
        <span contentEditable>{d}</span>
        <span contentEditable>#123456</span>
      </div>
      <img className={classNames('c-header__logo', `-${headerImage}`)} src={require(`../../assets/header_${headerImage}.png`)} alt='logo' />
      {showSlider && <Tooltip style={floatingStyles} ref={refs.setFloating}>
        <select value={headerImage} onChange={(e: ChangeEvent<HTMLSelectElement>) => setHeaderImage(e.target?.value)} >
          <option value={'main'}>Principal</option>
          <option value={'art'}>Art & Culture</option>
          <option value={'econ'}>Économie</option>
          <option value={'intl'}>International</option>
          <option value={'just'}>Justice</option>
          <option value={'news'}>News</option>
          <option value={'opinion'}>Opinion</option>
          <option value={'pol'}>Politique</option>
          <option value={'sport'}>Sport</option>
          <option value={'tech'}>Technologie</option>
        </select>
      </Tooltip> }
    </header>
  );
};