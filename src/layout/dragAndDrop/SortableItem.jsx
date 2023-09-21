import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../../styles/sortableItem.css";

export function SortableItem({ item }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='sortableItem'
    >
      <img src={item.img} alt={item.name} />
      <h4>{item.tag}</h4>
    </div>
  );
}
