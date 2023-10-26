import classNames from 'classnames';
import './_Image.scss';
import { ComponentProps, FC, useState, MouseEvent, ChangeEvent } from "react";

type Props = ComponentProps<'img'> & {
  resizable?: boolean;
};

export const Image: FC<Props> = ({src, resizable, ...props}) => {
  const [imgUrl, setImgUrl] = useState(src);
  const [showUrl, setShowUrl] = useState(false);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setImgUrl(e.target?.value);
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
    <div className={classNames('c-image', {'-isResizable': resizable})}>
      <img src={imgUrl} alt="" onClick={clickImage} {...props} />
      {showUrl &&
        <div className="overlay" onClick={clickOverlay}>
          <input value={imgUrl} onChange={onChange} type="text" />
        </div>
      }
    </div>

  )
}