import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const SocialIconListItem = ( { listItemKey, className, styles, index, icon, moveSocialNetwork } ) => {
	// useDrag - the list item is draggable
	const [ { isDragging }, dragRef ] = useDrag( {
		type: 'socialItem',
		item: { index },
		collect: ( monitor ) => ( {
			isDragging: monitor.isDragging(),
		} ),
	} );

	// useDrop - the list item is also a drop area
	const [ spec, dropRef ] = useDrop( {
		accept: 'socialItem',
		hover: ( item, monitor ) => {
			console.log( item );
			const dragIndex = item.index;
			const hoverIndex = index;
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY = ( hoverBoundingRect.bottom - hoverBoundingRect.top ) / 2;
			const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

			// if dragging down, continue only when hover is smaller than middle Y
			if ( dragIndex < hoverIndex && hoverActualY < hoverMiddleY ) {
				return;
			}
			// if dragging up, continue only when hover is bigger than middle Y
			if ( dragIndex > hoverIndex && hoverActualY > hoverMiddleY ) {
				return;
			}

			moveSocialNetwork( dragIndex, hoverIndex );
			item.index = hoverIndex;
		},
	} );
	// Join the 2 refs together into one (both draggable and can be dropped on)
	const ref = useRef( null );
	const dragDropRef = dragRef( dropRef( ref ) );
	const opacity = isDragging ? 0.8 : 1;
	return (
		<li ref={ dragDropRef } key={ listItemKey } className={ className } style={ { ...styles, opacity } }>
			{ icon }
		</li>
	);
};

export default SocialIconListItem;
