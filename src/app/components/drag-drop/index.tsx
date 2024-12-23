import { Box } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DraggableList = ({ items, onDragEnd, renderItem, ...boxProps }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            p={2}
            border="1px solid #ccc"
            borderRadius="md"
            {...boxProps}
          >
            {items?.map((item, index) => (
              <Draggable
                key={item.id || item._id}
                draggableId={item.id || item._id}
                index={index}
              >
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    my={2}
                    p={3}
                    borderRadius="md"
                    // bg="white"
                  >
                    {renderItem(item, index)}
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
