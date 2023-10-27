import classNames from 'classnames';
import './_Tooltip.scss';
import { ComponentProps, FC } from 'react';
  
type Props = ComponentProps<'div'>;
  
export const Tooltip: FC<Props> = ({ className, children, ...props }) => {

  const baseClassName = 'c-tooltip';
  const getClassName = () => classNames(baseClassName, className);

  return (
    <div className={getClassName()} {...props}>
      {children}
    </div>
  );
};