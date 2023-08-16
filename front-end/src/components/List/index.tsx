import { useState, useRef } from "react";

import UpIcon from '../../assets/img/up-icon.svg';
import DownIcon from '../../assets/img/down-icon.svg';

export interface ListElement {
    id: string | number;
    title: string;
}

interface ListProps {
    elements: ListElement[];
    elementType: string;
    handleElementClick: (id: string | number, title: string) => void;
};

function List({ elements, elementType, handleElementClick }: ListProps) {
    const ul = useRef<HTMLUListElement>(null);
    const up = useRef<HTMLButtonElement>(null);
    const down = useRef<HTMLButtonElement>(null);
    const buttonDescription = useRef<HTMLSpanElement>(null);

    const [isActive, setIsActive] = useState(false);

    function handleScrollButtonClick(direction: string) {
        const elementHeight = ul.current?.firstElementChild?.clientHeight || 0;
        const offSet = elementHeight + 50 + (elementHeight / 4.1);
        const newScrollProps = {
            top: (ul.current?.scrollTop || 0) + (direction === 'up' ? -offSet : offSet),
            behavior: 'smooth'
        } as ScrollToOptions;

        ul.current?.scrollTo(newScrollProps);
    }

    function handleScroll() {
        if (!isActive) {
            buttonDescription.current?.classList.add('u-opacity-0');
            setTimeout(() => {
                buttonDescription.current?.classList.add('u-display-none')
                setIsActive(true);
            }, 200);
        }

        if (ul.current) {
            const scrollPosition = ul.current.scrollTop + ul.current.clientHeight;
            const scrollHeight = ul.current.scrollHeight;

            switch (scrollPosition) {
                case scrollHeight:
                    down.current?.classList.add('u-rotateX-90');
                    break;

                case ul.current.clientHeight:
                    up.current?.classList.add('u-rotateX-90');
                    break;

                default:
                    down.current?.classList.remove('u-rotateX-90');
                    up.current?.classList.remove('u-rotateX-90');
                    break;
            }
        }
    }

    return (
        <div className='list u-margin-top-super-small'>
            <button ref={up}
                onClick={() => handleScrollButtonClick('up')}
                className={`list__scroll-button--no-description ${!isActive ? 'u-rotateX-90' : ''} ${elements.length < 5 ? 'u-display-none' : ''}`}
            >
                <div className='list__scroll-button__content-box--no-description'>
                    <img src={UpIcon} className='list__scroll-button__content__icon' />
                </div>
            </button>
            {elements.length === 0 ?
                <h3 className='heading-terciary u-margin-top-big u-center-text' >Não há {elementType} disponíveis.</h3>
                :
                <>
                    <ul ref={ul} onScroll={handleScroll} className={`list__element-box${elements.length < 5 ? '--no-scroll' : ''}`}>
                        {elements.map((element: ListElement, index) => {
                            const { id, title } = element;
                            return (
                                <li
                                    key={index+1}
                                    onClick={() => handleElementClick(id, title)}
                                    className='list__element'
                                >
                                    <span className='list__element__title u-center-text'>{title}</span>
                                </li>
                            );
                        })}
                    </ul>

                    <button
                        ref={down}
                        onClick={() => handleScrollButtonClick('down')}
                        className={`list__scroll-button${isActive ? '--no-description' : ''} ${elements.length < 5 ? 'u-display-none' : ''}`}
                    >
                        <div className={`list__scroll-button__content-box${isActive ? '--no-description' : ''}`}>
                            <span ref={buttonDescription} className='list__scroll-button__content__description'>
                                Mais {elementType}
                            </span>

                            <img src={DownIcon} className={'list__scroll-button__content__icon'} />
                        </div>
                    </button>
                </>
            }
        </div>
    );
}

export default List;