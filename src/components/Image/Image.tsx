import classNames from 'classnames';
import './_Image.scss';
import { ComponentProps, FC, useState, MouseEvent, ChangeEvent } from "react";
import { useOnClickOutside } from '../../hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faImage } from '@fortawesome/free-solid-svg-icons';

type Props = ComponentProps<'img'> & {
  resizable?: boolean;
  className?: string;
  description?: boolean;
  isBottomAligned?: boolean;
  isHidden?: boolean;
};

export const Image: FC<Props> = ({src, resizable, description, isBottomAligned, isHidden, className, ...props}) => {
  const [imgUrl, setImgUrl] = useState(src);
  const [imgDescription, setImgDescription] = useState('');
  const [showImage, setShowImage] = useState(!isHidden);
  const [showUrl, setShowUrl] = useState(false);
  const onClickOutsideRef = useOnClickOutside<HTMLDivElement>(()=>setShowUrl(false));

  const onChangeURL = (e: ChangeEvent<HTMLInputElement>) => {
    setImgUrl(e.target?.value);
  }
  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setImgDescription(e.target?.value);
  }

  const clickOverlay = (e: MouseEvent<HTMLDivElement>) => {
    if(e.target !== e.currentTarget) return;
    setShowUrl(false);
  }
  const clickImage = (e: MouseEvent<HTMLDivElement>) => {
    if(e.target !== e.currentTarget) return;
    setShowUrl(true);
  }

  return (
    <div className={classNames('c-image', className, {'-isBottomAligned': isBottomAligned})} ref={onClickOutsideRef}>
      {!showImage ? 
        <button className={'c-image__buttonShow'} onClick={()=>setShowImage(true)}>
          <FontAwesomeIcon icon={faEye} /><FontAwesomeIcon icon={faImage} />
        </button>
        :
        <button className={'c-image__buttonHide'} onClick={()=>setShowImage(false)}><FontAwesomeIcon icon={faEyeSlash} /><FontAwesomeIcon icon={faImage} /></button>
      }
      {showImage && <div className={classNames('c-image__resizer', {'-isResizable': resizable})}>
        <img src={imgUrl} alt="" onClick={clickImage} {...props} />
        {imgDescription && <div className='c-image__description'>{imgDescription}</div>}
        {showUrl &&
          <div className="overlay" onClick={clickOverlay}>
            <input placeholder="URL de l'image" value={imgUrl} onChange={onChangeURL} type="text" />
            {description && <input placeholder="Description" value={imgDescription} onChange={onChangeDescription} type="text" />}
          </div>
        }
      </div> }
    </div>

  )
}