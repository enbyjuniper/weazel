import classNames from 'classnames';
import './_Text.scss';
import { ComponentProps, FC, useEffect, useRef, useState } from 'react';
import { useFloating, inline, flip, shift, autoUpdate, useDismiss, useInteractions } from '@floating-ui/react';
import { faBold, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '../Tooltip';
  
type Props = ComponentProps<'div'> & {
  text?: string,
  date: string,
};
  
export const Text: FC<Props> = ({ className, text, date, ...props }) => {
  const baseClassName = 'c-text';
  const getClassName = () => classNames(baseClassName, className);
  const [isOpen, setIsOpen] = useState(false);
  const selectableRef = useRef<HTMLSpanElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom",
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [inline(), flip(), shift()],
    whileElementsMounted: autoUpdate
  });

  const dismiss = useDismiss(context);

  const { getFloatingProps } = useInteractions([dismiss]);

  useEffect(() => {
    function handleMouseUp(event: MouseEvent) {
      if (refs.floating.current?.contains(event.target as Element | null)) {
        return;
      }

      setTimeout(() => {
        const selection = window.getSelection();
        const range =
          typeof selection?.rangeCount === "number" && selection.rangeCount > 0
            ? selection.getRangeAt(0)
            : null;

        if (selection?.isCollapsed) {
          setIsOpen(false);
          return;
        }

        if (range) {
          refs.setReference({
            getBoundingClientRect: () => range.getBoundingClientRect(),
            getClientRects: () => range.getClientRects()
          });
          setIsOpen(true);
        }
      });
    }

    function handleMouseDown(event: MouseEvent) {
      if (refs.floating.current?.contains(event.target as Element | null)) {
        return;
      }

      if (window.getSelection()?.isCollapsed) {
        setIsOpen(false);
      }
    }
    const selRef = selectableRef.current;

    selRef?.addEventListener("mouseup", handleMouseUp);
    selRef?.addEventListener("mousedown", handleMouseDown);

    return () => {
      selRef?.removeEventListener("mouseup", handleMouseUp);
      selRef?.removeEventListener("mousedown", handleMouseDown);
    };
  }, [refs, selectableRef]);
  
  var options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const d = new Date(date.replace(/-/g, '/')).toLocaleDateString("fr-Ca", options);

  return (
    <div className={getClassName()} {...props}>
      <span contentEditable className='date'>Los Santos, {d}</span>
      <span contentEditable ref={selectableRef}>
        {text}
      </span>
      {isOpen && (
        <Tooltip
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
          }}
          {...getFloatingProps()}
        >
          <button onClick={()=>document.execCommand('bold', false)}><FontAwesomeIcon icon={faBold} /></button>
          <button onClick={()=>document.execCommand('italic', false)}><FontAwesomeIcon icon={faItalic} /></button>
          <button onClick={()=>document.execCommand('underline', false)}><FontAwesomeIcon icon={faUnderline} /></button>
        </Tooltip>
      )}

    </div>
  );
};