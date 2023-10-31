import classNames from 'classnames';
import './_Tooltip.scss';
import { ComponentProps, forwardRef } from 'react';
  
type Props = ComponentProps<'div'>;
  
export const Tooltip = forwardRef<HTMLDivElement, Props>(({ className, children, ...props }, ref) => {

  const baseClassName = 'c-tooltip';
  const getClassName = () => classNames(baseClassName, className);

  return (
    <div ref={ref} className={getClassName()} {...props}>
      {children}
    </div>
  );
});