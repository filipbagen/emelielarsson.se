import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Button from './Button.tsx';

interface MultilingualEditorProps<T> {
  data: {
    [lang: string]: {
      list: T[];
      [key: string]: any;
    };
  };
  onDataChange: (newData: any) => void;
  renderItem: (
    lang: string,
    item: T,
    index: number,
    removeItem: (lang: string, index: number) => void
  ) => React.ReactNode;
  addItemTemplate: T;
  renderHeader?: (
    lang: string,
    data: any,
    onDataChange: (newData: any) => void
  ) => React.ReactNode;
  addButtonText?: string;
}

const MultilingualEditor = <T extends object>({
  data,
  onDataChange,
  renderItem,
  addItemTemplate,
  renderHeader,
  addButtonText = '+ Add Item',
}: MultilingualEditorProps<T>) => {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    onDataChange((prevData: any) => {
      const updatedData = { ...prevData };
      Object.keys(updatedData).forEach((language) => {
        const updatedList = [...updatedData[language].list];
        const [reorderedItem] = updatedList.splice(sourceIndex, 1);
        updatedList.splice(destinationIndex, 0, reorderedItem);
        updatedData[language] = {
          ...updatedData[language],
          list: updatedList,
        };
      });
      return updatedData;
    });
  };

  const addItem = (lang: string) => {
    onDataChange((prevData: any) => {
      const updatedData = { ...prevData };
      Object.keys(updatedData).forEach((language) => {
        updatedData[language] = {
          ...updatedData[language],
          list: [...updatedData[language].list, { ...addItemTemplate }],
        };
      });
      return updatedData;
    });
  };

  const removeItem = (lang: string, index: number) => {
    onDataChange((prevData: any) => {
      const updatedData = { ...prevData };
      Object.keys(updatedData).forEach((language) => {
        const updatedList = [...updatedData[language].list];
        updatedList.splice(index, 1);
        updatedData[language] = {
          ...updatedData[language],
          list: updatedList,
        };
      });
      return updatedData;
    });
  };

  return (
    <div className="flex flex-row gap-6 justify-center">
      <DragDropContext onDragEnd={handleDragEnd}>
        {Object.keys(data).map((lang) => (
          <div key={lang} className="p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-semibold mb-4">
              {lang.toUpperCase()}
            </h2>

            {renderHeader && renderHeader(lang, data, onDataChange)}

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Button variant="primary" onClick={() => addItem(lang)}>
                  {addButtonText}
                </Button>
              </div>

              <Droppable droppableId={`list-${lang}`}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {data[lang].list.map((item: T, index: number) => (
                      <Draggable
                        key={index}
                        draggableId={`${lang}-item-${index}`}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {renderItem(lang, item, index, removeItem)}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        ))}
      </DragDropContext>
    </div>
  );
};

export default MultilingualEditor;
