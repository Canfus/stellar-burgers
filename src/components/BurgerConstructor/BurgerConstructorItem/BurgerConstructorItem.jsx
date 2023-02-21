// Import React functions
import { useRef } from 'react';
import styles from './BurgerConstructorItem.module.css';

// Import PropTypes
import PropTypes from 'prop-types';
import IngredientItem from '../../../utils/types';

// Import Redux functions
import { useDispatch } from 'react-redux';
import { deleteConstructorItem } from '../../../services/slices/ConstructorItemsSlice';

// Import DnD functions
import { useDrag, useDrop } from 'react-dnd';

// Import Burger UI components
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructorItem = ({ item, index, moveCard }) => {
    const dispatch = useDispatch();

    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'component',
        collect: monitor => ({
            handlerId: monitor.getHandlerId()
        }),
        hover: (item, monitor) => {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current.getBoundingClientRect();

            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            moveCard(dragIndex, hoverIndex)

            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => ({ id: item.id, index }),
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const opacity = isDragging ? 0 : 1;

    if (item.type !== 'bun') drag(drop(ref));

    const preventDefault = (e) => e.preventDefault();

    // Delete ingredient from constructor
    const deleteItem = (index) => {
        dispatch(deleteConstructorItem(index));
    }

    return (
        <section
            ref={ref}
            style={{ opacity }}
            onDrop={preventDefault}
            data-handler-id={handlerId}
        >
            <DragIcon type='primary' />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                extraClass={styles.Item}
                handleClose={() => dispatch(deleteItem(index))}
            />
        </section>
    );
};

BurgerConstructorItem.propTypes = {
    item: IngredientItem.isRequired,
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired
};

export default BurgerConstructorItem;