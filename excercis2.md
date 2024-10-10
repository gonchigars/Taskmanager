# React DnD Tutorial: Building a Draggable List

In this tutorial, we'll create a simple draggable list using react-dnd. Users will be able to reorder items in the list by dragging and dropping them.

## Step 1: Set up the project

First, create a new React project and install the necessary dependencies:

```bash
npx create-react-app react-dnd-tutorial
cd react-dnd-tutorial
npm install react-dnd react-dnd-html5-backend
```

## Step 2: Set up the DnD context

In your `src/App.js` file, set up the DnD context:

```jsx
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableList from './DraggableList';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>Draggable List</h1>
        <DraggableList />
      </div>
    </DndProvider>
  );
}

export default App;
```

## Step 3: Create the DraggableList component

Create a new file `src/DraggableList.js`:

```jsx
import React, { useState } from 'react';
import DraggableItem from './DraggableItem';

const DraggableList = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
  ]);

  const moveItem = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, dragItem);
      return newItems;
    });
  };

  return (
    <div>
      {items.map((item, index) => (
        <DraggableItem 
          key={item.id} 
          index={index} 
          id={item.id} 
          text={item.text} 
          moveItem={moveItem} 
        />
      ))}
    </div>
  );
};

export default DraggableList;
```

## Step 4: Create the DraggableItem component

Create a new file `src/DraggableItem.js`:

```jsx
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemTypes = {
  ITEM: 'item',
};

const DraggableItem = ({ id, text, index, moveItem }) => {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.ITEM,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.ITEM,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity, padding: '10px', margin: '5px', border: '1px solid black', cursor: 'move' }} data-handler-id={handlerId}>
      {text}
    </div>
  );
};

export default DraggableItem;
```

## Step 5: Explanation of the code

1. **DndProvider**: This component from react-dnd wraps our app and provides the drag and drop context.

2. **useDrag**: This hook is used in the DraggableItem component to make each item draggable. It returns the `isDragging` state and a `drag` function to attach to the draggable element.

3. **useDrop**: This hook is also used in the DraggableItem component to make each item a drop target. It handles the logic for when an item is dragged over another item.

4. **moveItem**: This function in the DraggableList component handles the reordering of items when one is dragged and dropped.

5. **ref**: We use a ref to get the DOM node of each item, which is needed for calculating drag and drop positions.

6. **opacity**: We change the opacity of an item while it's being dragged to give visual feedback to the user.

## Step 6: Run and test

Now you can run your app with `npm start` and test the drag and drop functionality. You should be able to drag items in the list and reorder them.

This tutorial demonstrates the basic concepts of react-dnd:
- Setting up the DnD context
- Making items draggable with `useDrag`
- Creating drop targets with `useDrop`
- Handling the movement of items

As you become more comfortable with these concepts, you can create more complex drag and drop interfaces, like the Kanban board we discussed earlier.
